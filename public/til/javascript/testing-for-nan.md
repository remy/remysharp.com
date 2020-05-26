# Testing for NaN

Eslint complains about use of `isNaN` (in certain configurations). The proposed answer is to use `Number.isNaN` but if you're testing specifically for `NaN` this is the method to use:


```
Number.isNaN(Number(value))

// bad
isNaN('1.2'); // false
isNaN('1.2.3'); // true

// good
Number.isNaN(Number('1.2'));   // false - 1.2 is a float
Number.isNaN(Number('1.2.3')); // true - isNaN, 1.2.3 is a string
```

