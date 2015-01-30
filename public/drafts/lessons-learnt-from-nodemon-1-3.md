# Lessons learnt from nodemon 1.3

I recently pushed out an update to [nodemon](https://www.npmjs.org/nodemon) going from 1.2 to 1.3 containing a few new features which I wanted to share here.

<!--more-->

Along with a slew of [changes and bug fixes](https://github.com/remy/nodemon/compare/v1.2.1...v1.3.2) came three interesting changes:

1. Support for events at the nodemon.json level allowing growl-like notifications
2. Virtual machine support where the clock inside the container was different to the host clock
3. Support piping commands in the exec (a trick I learnt from the [npm source](https://github.com/npm/npm/))

## Exposing events to nodemon.json

nodemon