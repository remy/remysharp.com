# node.js rapid development: nodemon

[node.js](http://nodejs.org/ "node.js") is clearly the hottest thing since sliced bread, and recently I've been working on a larger project that runs as a node server.

The problem I encountered was that, unlike a PHP based web app, whenever I made any changes to the code, I would have to manually stop and start node. This bugged me. So I created [nodemon](http://github.com/remy/nodemon/ "nodemon - automatically restart node.js") to make rapid dev a little easier.

<!--more-->

## Install & usage

You can install nodemon using [npm](npmjs.org) (a node package manager) via:

    npm install nodemon

Now nodemon will be available on the command line and can run your application, as such:

    nodemon server.js 8000

Where `server.js` is my application and (in my case) `8000` is an argument to my app. Equally I could be running it with a debugger attached:

    nodemon --debug server.js 8000

nodemon won't hide any of your application output, and doesn't require any changes to your existing application.

## What it does do?

nodemon wraps your node application and sits quietly looking for file changes in the directory you ran nodemon from. That includes any sub-directories too. It's using the unix `find` command (so it's not available for Windows users right now, sorry), but this means that it's pretty quick to pick up changes.

As soon as you save a file in any directory of your application, nodemon will restart your node app.

## What if I don't want it to restart?

nodemon comes with the ability to ignore file patterns (regex's are supported thanks to [@fearphage](http://twitter.com/fearphage). So in my application, I've got a `public` directory used by [express](http://expressjs.com/). Node doesn't need to be restarted for those static files (images, CSS, .less, etc). So I can tell nodemon to ignore anything in the `public` directory. 

nodemon will create an empty `nodemon-ignore` which you can add to (and here's a [fuller example](http://github.com/remy/nodemon/blob/master/nodemon-ignore.example)). So my `nodemon-ignore` would look like this:

    # ignore the static directory
    /public/*

What I think it really neat about the ignore file, and has made my dev go pretty quickly, is this:

At any time, you can edit the `nodemon-ignore` file, commenting out directories whilst you work on a larger change where lots of files might change. nodemon is watching for any changes to the ignore file, and if it does change, it automatically reloads the list of files and directories to ignore.

Then you can uncomment the directory back in, nodemon reloads the ignore file and the next change it'll detect, it'll restart your app again - thus preventing lots of unnecessary restarts when you know you'll be breaking your app.

## What about if my app throws and error and breaks?

nodemon will pause, echoing out the error and stack trace as you'd expect, and the next file change - i.e. when you find the culprit and fix him, nodemon will try to restart your app again.

## Bugs, feedback, etc

If you've got any suggestions or bugs you spot, let me know via an [issue](http://github.com/remy/nodemon/issues) and it should be quick to fix (it's a fairly simple script really).

I'm already using it on one of my projects and it's let me just ignore the stop/start shenanigans whilst I get on with my coding, so at least it's already helping someone!