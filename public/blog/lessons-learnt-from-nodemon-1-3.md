# Lessons learnt from nodemon 1.3

I recently pushed out an update to [nodemon](https://www.npmjs.org/nodemon) going from 1.2 to 1.3 containing a few new features and insights which I wanted to share here.

<!--more-->

Along with a slew of [changes and bug fixes](https://github.com/remy/nodemon/compare/v1.2.1...v1.3.6) came three interesting changes:

1. Support for events at the nodemon.json level allowing growl-like notifications
2. Virtual machine support where the clock inside the container was different to the host clock
3. Support piping commands in the exec (a trick I learnt from the [npm source](https://github.com/npm/npm/))

## Exposing events to nodemon.json

When you require nodemon you can listen for [events](https://github.com/remy/nodemon/wiki/Events#states). Since the contents of `nodemon.json` gets mapped directly to `nodemon.config.options` I was able to read an event property and easily bind those events to spawn your customised commands:

```js
Object.keys(config.options.events).forEach(function (key) {
  nodemon.on(key, function () {
    spawn(config.options.events[key], config, [].slice.apply(arguments));
  });
});
```

Now from inside a global `nodemon.json` (that lives in my home directory) I can add the following to trigger OS level notifications that tell me my server restarted:

```json
{
  "events": {
    "restart": "osascript -e 'display notification \"app restarted\" with title \"nodemon\"'"
  }
}
```

## Virtual machines / Docker

Using docker containers has become increasingly popular. Nodemon is used in all sorts of situations but more and more people found that nodemon wasn't working in the VM. This is almost entirely due to the fact that the container often has a completely different datetime to the host, and in fact what was happening is the host would touch the file and the timestamp to the container, was in the *future*!

So how do you work out the time drift between the container and the host?

After a lot of poking and randomly testing things, it turns out it's pretty easy: touch the the file from inside the container, then compare the modified time to the system time.

For some reason (in my tests and others), the container would use the host datetime when touching files.

So now nodemon upon startup, touches a file and if the timestamp is significantly off the system clock, it warns that there's a drift and adjusts how it searches for changes on the file system.

```text
[nodemon] virtual machine clock offset: 12h31m58s
[nodemon] v1.3.6
...
```

## Supporting piped commands

Both the `exec` and the event commands now support being able to pipe commands together ala Unix as such:

```bash
nodemon -x 'tap test/**/* | tap-spec'
```

Now nodemon will restart my tests and run them through tap-spec.

The  way this works was lifted from the npm source code.

For Unix based systems you run:

```bash
sh -c "tape test/**/* | tap-spec"
```

In windows it's:

```bash
cmd /c "tape test/**/* | tap-spec"
```

Then just drop that into the `spawn` function and you're good to go.

## Update

So go ahead and get the latest nodemon via `npm install -g nodemon@latest` — and if you feel inclined, maybe ping npm folk to get nodemon on their front page too!