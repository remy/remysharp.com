Following on from a few others out there, I wanted to share my software and hardware day to day tools. Not all of it is work based, but we gotta relax too, right?

<!--more-->

## Software

### iTerm

First and foremost of any software, I use iTerm, _possibly_ more than a browser. 

I started commercial web development in 1999 and although we had a desktop editor (GWD, a precursor to Textedit+) I'd quite often have to code, debug and deploy live on production machines. So it was do or die with the terminal. 

For Windows PuTTY was my goto, and since discovering iTerm2 on the Mac, it's the first tool I reach for.

I use zsh in my terminal and have blogged about the particular setup. My two favourite aspects: ponysay greets me on every new terminal and my pink blinking cursor.

### dotfiles

They're on github, and forked from various other developers but where my real interest lays is in the `.aliases` and `.functions` where I'd add a lot of customisation and shortcuts that have become muscle memory.

### Git

I don't know any developers that don't use git (but if you're one, then definitely take a look). Having my own local repo is so powerful, even if it's a last resort undo.

I've had the pleasure of coming to git from svn, and before that CVS and before that RCS, so I truely appreciate that simplicity that git affords, even if it's not immediately obvious and takes months (of not years) to grok.

### CLI tools

- curl - and almost never wget. Just habit I think, but I usually tend towards the debugging aspects of curl.
- json - a simpler jq tool for json parsing and manipulation.
- awk, perl and tr - 3 preinstalled and relatively old tools, but I find myself using them a lot. Although I feel like I should be using sed instead of Perl, I started out in '99 writing Perl (until mid-2000) so I find it easier to do file and stream manipulation.
- vi (or actually vim) - I've been using vi for almost 2 decades yet I only know a handful of commands, albeit enough to do full changes in production if needs be. Though I don't use any plugins which I think might help me settle in a little easier.
