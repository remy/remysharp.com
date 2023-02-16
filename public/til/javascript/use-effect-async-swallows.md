# React's useEffect swallows async errors

I don't particularly use this pattern, but I ran across it recently and it took me a while to work out what was happening (it does make sense if you think about it, but running through code it's not easy to spot).

In the following example you won't see any errors nor any logging.

```js
useEffect(() => {
  const test = async = () => {
    someFunctionThatThrows();
    console.log("sid");
  };

  try {
    test();
  } catch (e) {
    console.log("sam");
  }
}, []);
```

It needs to either change to to explicitly catches (which I tend to prefer because it feels explicit) or a try catch _inside_ the async:

```js
useEffect(() => {
  const test = async = () => {
    try {
      someFunctionThatThrows();
    } catch (e) {
      console.error(e);
    }
    console.log("test has finished");
  };

  test();
}, []);
```

Or, which covers more cases:

```js
useEffect(() => {
  const test = async = () => {
    someFunctionThatThrows();
    console.log("test has finished");
  };

  test().catch(e => console.error(e));
}, []);
```
