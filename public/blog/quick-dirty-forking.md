# Quick & Dirty Forking

I've often come across a github hosted repo that was purely client side, but didn't have a hosted demo. Maybe a simple JavaScript library, or a CSS effect, but no url that I could see it in action.

I'm left with the decision do I clone the project locally and fire up my own server, look at it, then shortly after delete it as I was only planning to browse...or something else?

How about "quick preview"? So I [built](https://github.com/remy/5minutefork) that in a few hours last month: [5minfork.com](http://5minfork.com).

<small>Sure, I know this isn't really a fork, but 5 minute clone didn't have the same ring to it!</small>

<!--more-->

## The idea

The concept is simple, but requires a non-blocking server if I wanted to make the service public - which I'll explain why in a moment:

1. It needed to be simple to go from github repo url to this preview system.
2. The previewed fork needed to be served from the root of the hostname, because it's likely the resources in the repo would run off absolute paths.
3. I wanted the previews to automatically clean themselves up, so I didn't end up chomping loads of disk space.
4. Cloning a project should not take down the server!

I knew this should be simple with [Node.js](http://nodejs.org) mostly because I needed to send off the clone process in the background (to the main application) and only once it's returned, do I serve up the forked content.

## The way it works

Using the [connect](https://github.com/senchalabs/connect) library I have my own custom router that does most of the work.

Then clones are spawned out to a separate process, and once completed, a unique hash is created as a new subdomain for the server with it's own router pointing to the new clone. After 5 minutes of idle time, the clone is automatically removed and cleaned up.

## Repo router

When you request anything off the default root of the server, it assumes (unless the resource is found in the `public` directory) that you're referring to a github repo, ie. `https://github.com/remy/5minfork`

The problem was that usernames and repos are case sensitive, but urls aren't. So when you redirect to the subdomain (which I wanted to be `remy-5minfork`), it wouldn't work, because subdomain switch to lowercase, and now it doesn't know the difference between `5MINFORK` and `5minfork`. So to get around this, a hash is made for the path, stored in a JavaScript object in the server, and immediately [redirected](https://github.com/remy/5minutefork/blob/master/index.js#L71) to `http://<hash>.5minfork.com`.

This subdomain then [looks up](https://github.com/remy/5minutefork/blob/master/index.js#L20) the original github repo url, and kicks off the fork process.

## Forking (actually cloning...)

I apologise for my interchangeable use of fork & clone - blame github (apparently). 

My exceptionally short [fmf.js](https://github.com/remy/5minutefork/blob/master/lib/fmf.js) script works out the github repo url, and spawns a [fork](https://github.com/remy/5minutefork/blob/master/lib/fmf.js#L51).  Once all the spawn's data has ended, it triggers the callback, that tells my server the fork was [successful](https://github.com/remy/5minutefork/blob/master/index.js#L39).

## Dynamic router

This is the "clever bit" (given how short the code is, don't expect to be wowed).

A [new router is created](https://github.com/remy/5minutefork/blob/master/index.js#L41) for this specific fork, and stored against the hashed url (so we know when we hit `http://abc321.5minfork.com` it has a bunch of info associated with it).

Then with that new router, it [passes](https://github.com/remy/5minutefork/blob/master/index.js#L56) the *original* `request` and `response` objects, which then handle the entire http request - thus being able to serve up the static previewed repo.

The new router is made up of the [static](http://www.senchalabs.org/connect/static.html) router, and the [directory](http://www.senchalabs.org/connect/directory.html) router (specifically because most repos without a preview, don't have an index.html page).

## The final bits

You might think I was using the vhosts connect module, but I'm not, a simple bit of middleware is parsing the host out of the request header and making up the `req.subdomain` property, which I use to match up to the hash that links to the repo data.

A simple timer fires every 10 seconds to see when the repo was last accessed, and if that difference is more than 5 minutes, it blows away the directory.

Like I said, quick and dirty. 

Of course all the code is up [on github](https://github.com/remy/5minutefork). Hopefully this write up or the tool itself is useful to you, I know I've already started using it. Now all I need is a little browser plugin to add a preview icon next on the github repo page, so it's even faster to get the 5 minute fork!