# Windows 10 BASHing

It's a play on term, *bash*, because I'm trying out Window 10's Ubuntu BASH subsystem. Get it? Geddit? Anyway. I'm trying out some new development on Windows 10 and I wanted to write up some of my experience here.

<!--more-->

I'm using the terminal a lot (if you didn't gather by the inline ad on this page for [terminal.training](https://terminal.training)!), but my Windows terminal experience is limited. Although I come originally from Windows, I've since found myself extremely comfortable inside of the *nix bash-like environments, and on my Mac I'll spend at least 50% of the time in the terminal.

On Windows, there's a few terminal options available:

- Old reliable cmd.exe - as simple as it comes, with a few enhancements allowing me to use `ls` and it will map to `dir`.
- Powershell - which as yet, I have zero experience with, but I have heard that if the shell is properly embraced, it can be better than bash due to the way data is shared (though, I may well be misquoting!).
- cygwin - the "old" way to use bash commands on Windows. So far as I can tell, this isn't recommended any more, possibly because it was such a headache to get right - I've certainly burned through many hours in the past trying to install all the things to get this right
- git-bash - which is probably the most sensible goto for a mixed bash and windows environment (more on this in a moment)
- Ubuntu BASH subsystem - fully immersive unix environment, including the ability to install using `apt-get` which is great, but comes with it's own problems.

## Subsystem vs. shallow fake

My two preferences here are going to be git-bash (the shallow fake) and the bash subsystem. What appeals to me most about the bash subsystem is that everything is there that I'd expect from a unix based system. I tried to run `wget` and (obviously) it wasn't installed. This was simple (to me) to fix as I'm already familiar with the installation process on unix: I can run `apt-get install wget` and now I've installed the program I wanted to run.

Then I went ahead and installed `git` using the same installation process: still all good. But when I switched over to Visual Studio Code to do some development, I went to run a git clone, and it failed, reporting that git was missing.

Git was was missing from Windows. I may have already installed git into the bash subsystem, but not into Windows itself. So now I needed to install git separately into Windows (which conveniently comes with git-bash).

Now inside of git-bash I have the git commands, but I don't have `wget`, which I installed earlier. But I installed wget into bash, not windows. Hopefully you can see how I'm going in circles here!

The additional problem for me, is that git-bash isn't _quite_ bash. It _looks_ like bash, but it's not. It's masquerading. I quickly tried to run `wget example.com` and it gives me a command not found. Sure, wget isn't available by default, but typically here I'd install it. But...with a fake bash, I'm not quite sure how (though I'll work it out).

## The spinning top effect

There's already been quite a few moments for me where I forget that I'm inside the bash subsystem and can't work out why I can't see or communicate with part of Windows. Another simple example of this is the clipboard. A subsystem doesn't share the clipboard with it's parent. The same way as you might not expect a Docker instance to be able to read and write from your host machine's clipboard.

It's just a little too easy to forget that I'm inside this inception-like machine inside of Windows. Particularly compounded by the fact that I don't have a stable development environment in windows yet.

For now though, I'll continue to push my tooling inside of the bash subsystem, and see if I can work around the issues where software on the host (i.e. Windows) needs those tools. TBC.
