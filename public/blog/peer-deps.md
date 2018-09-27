# Peer Deps

Just using my blog to share a little tip for future me that current me keeps forgetting. Over the years when [working with clients](/work) I've created reusable React components, and it's pretty important to me to ensure that dependencies like React aren't dependencies of my own work - specifically to prevent React (for instance) being included multiple times in my projects.

So…

<!--more-->

The first part of this (reasonably) simple solution is to move the dependency from my _regular_ dependency to a `peerDependencies` (and as far as I know, I can't install and save directly to peer deps).

Now when my package is installed npm will warn on the console that React (or some other package) is a peer dependency and needs to be installed.

_However_ (of course), as soon as I `npm install …` another package, npm will (un)helpfully remove the peer dependency because npm notices that it's missing from the _direct_ dependencies.

The solution seems more like a workaround, but it's to duplicate the peer dependency in _both_ the `peerDependencies` and the `devDependencies`. That way further `npm install`s won't remove the required (development) dependency but when the project is published, the published package won't include the peer dependency.

As I said, one for future me 👍
