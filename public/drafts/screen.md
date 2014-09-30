# Persistent terminal sessions: screen

Have you ever had a remote terminal session running only have your connection drop out half way through a large task? Then you reconnect not knowing where it go up to, whether it crashed or what.

[Screen](http://www.gnu.org/software/screen/manual/screen.html) is the solution to this problem. Screen allows you to start terminal sessions that you can disconnect from and resume at any time. 

I personally use screen a lot with [Node.js](http://nodejs.org) web servers - so I can kick off the process, and resume my terminal session to check logs or errors or to restart the process in case it died.

This article is an introduction to screen for the average Joe/anne developers with a few tips and tricks.

## Installing

Screen is a unix-y tool, so with Ubuntu I'd use `apt-get` - it's also possible it's pre-installed on the machine (just type `screen` to find out):

    sudo apt-get install screen

## Instant win with screen

When I remote in to a machine, I run `screen` and it starts a new session (actually called a window - but I'll come on to more about these later). There's some blurb about what screen is, I hit return, and the session is ready.

From here I might start my process. Let's say I'm doing some large database export.

Now I need to *detach* from the screen so I can cleanly close the remote session or do something else whilst the export is happening. I type the command sequence:

    ctrl-a d

This will leave the session running and detach from the screen so you're back to your original terminal prompt.

To resume your screen session:

    screen -r

This will take you back to your screen session.

But what if my connection drops and closes whilst I'm inside of screen? When I resume my ssh session, the screen *could* still be attached, so that when I run `screen -r` it won't resume. This is simple to get around, you can detach the screen from *outside* of the screen session (and in our case, immediately resume using `-r`):

    screen -rd

So now you've got basic minimum use of screen, how about using some of it's features? Multiple screens, multiple windows, naming screen sessions & windows, setting defaults in the screen like scroll back, or displaying the title of the screen in the terminal.

## Screen commands

When you run screen more than once, you'll have multiple screen sessions on the go. To list the available screens:

    screen -ls

If you have more than one, you'll need to name the screen you want to resume:

    $ screen -ls
    There are screens on:
        17566.ttys001.remys-mba (Detached)
        18778.ttys001.remys-mba (Detached)
        19014.ttys001.remys-mba (Detached)
    
    $ screen -r 18778

This will resume the second screen (identified by it's process id). You can also resume last screen using `screen -RR`. But resuming using PIDs is ugly, so let's name the screens as we create them using the `-S` argument (this names the socket the screen connects to):

    $ screen -S database-dump
    [ctrl-a d]
    $ screen -ls
    There are screens on:
        17566.ttys001.remys-mba (Detached)
        18778.ttys001.remys-mba (Detached)
        19014.ttys001.remys-mba (Detached)
        18898.database-dump (Detached)
    
    $ screen -r database-dump

Now we have multiple named screens, let's look at multiple windows inside of a screen.

## Screen windowing

Screen supports having multiple "windows" inside a screen session. So you can have one screen and multiple windows dealing with specific jobs. 

Inside of a screen, use the command sequence to create a new window:

    ctrl-a c

The initial window is 0, second is 1 and so on, and there's a number of ways to switch windows:

    ctrl-a [n]     // where [n] is the window number
    ctrl-a ctrl-a  // switch to the last used window
    ctrl-a "       // show a list of all the windows
    ctrl-a A       // change the title of this window

There's [lots more key bindings](http://linux.about.com/od/Bash_Scripting_Solutions/a/The-Linux-Screen-Terminal-Window-Manager-Key-Bindings.htm) you can use inside of screen that allows you to navigate the windows beyond the scope of this article.

## Tricks

Even if you use screen in it's simplest form (as I usually do), I wanted to share a few tricks I found whilst digging deeper in to screen.

### Multiuser screens

To connect a second (or more) users to an existing screen session, use:

    screen -rx

Instead of detaching any users attached to the session (which is what would happen if we used `-r`) this allows me to join the session and anything I type in my window is echoed to any other users connected to the screen.

Maybe this could useful for remote support, or perhaps training. I've not used this in the wild yet, but it's certainly a fun idea!

### Keeping History

One problem with screen is the scroll back. If you scroll up in a screen, it doesn't scroll the history back, but the screen itself just scrolls away. To scroll back *inside* of the screen, you execute the `ctrl-a [` command. Now you can use your keyboard to navigate up and down (this is actually in "copy mode"). You can hit escape to return back to the prompt.

What might be more useful than a scroll back is a log of the screen session, which can be toggled on using `ctrl-a H`. This can be enabled by default with a `.screenrc` file though.

### Screen Defaults

Finally, I'll you with my own `.screenrc`. Create this file in your home directory, and this can configure your startup options for screen:

    # Always show a status line in the window footer
    hardstatus on
    hardstatus alwayslastline
    hardstatus string "%{.bW}%-w%{.rW}%n %t%{-}%+w %=%{..G} %H %{..Y} %m/%d %C%a "
                
    # Autodetach session on hangup instead of 
    # terminating screen completely
    autodetach on 
        
    # Turn off the splash screen
    startup_message off

    # set log on all windows
    deflog on

