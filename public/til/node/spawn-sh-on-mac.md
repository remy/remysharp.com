# Spawn sh on MacOS … doesn't

Running this code on a Mac:

```js
const spawn = require('child_process').spawn;

spawn(
  '/bin/sh',
  ['-c', 'node -e "setInterval(() => console.log(`running`), 200)"'],
)

console.log(process.pid);
```

Then checking the process tree:

```
-+= 39818 remy node index.js
 \--- 39819 remy node -e setInterval(() => console.log(), 200)
```

This yeilds a single subprocess for the parent pid. This is unexpected because it should have first spawned `sh` _then_ node, but it seems like MacOS skips this part (I'm still unsure how or why).

The same test on a non-Mac *nix system shows (notably from pid 18116):

```
$ ps  -o pid,ppid,cmd --forest
  PID  PPID CMD
17688 17687 -su
18116 17688  \_ node tests/fixtures/remy.js
18126 18116  |   \_ /bin/sh -c node -e "setInterval(() => console.log(`running`), 200)"
18128 18126  |       \_ node -e setInterval(() => console.log(), 200)
19771 17688  \_ ps -o pid,ppid,cmd --forest
```

Odd, but a gotcha for sure.
