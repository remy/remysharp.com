# Sentence case

A collection of ways that I can go from `number` to `Number` in the hope to a) stop reinventing the wheel and b) see how many ways I can skin this problem.

## Examples

```js
'number'.split('').map(_ => _.charCodeAt(0)).map((_, i) => i === 0 ? _ - 32 : _).map(String.fromCharCode).join('')
```

```js
'number'.split('').map((_, i) => _[`to${i === 0 ? 'Upper' : 'Lower'}Case`]()).join('')
```

This one is kind of silly and also potentially loses any capitalisation that already exists.

```js
'number'.toUpperCase().split('').reduce((_, n) => _ + n.toLowerCase())
```

```js
'number'.split('').reduce((_, n, i) => _ + (i ? n : n.toUpperCase()), '')
```

```js
new TextEncoder().encode('number').map((_, i) => i ? _ : _ ^ 0x20).reduce((_, n) => _ + String.fromCharCode(n), '');
```

```js
new TextEncoder().encode('number').reduce((_, n, i) => _ + String.fromCharCode(i ? n : n ^ 0x20), '');
```

```js
(([a,...r])=>[a.toUpperCase(),...r].join(''))('number') // via twitter https://twitter.com/jamesseanwright/status/1071048376874094595
```

```js
(n=>n[0].toUpperCase()+n.slice(1))('number')
```

```js
(([n])=>n[0].toUpperCase()+n.slice(1))`number`
```

Random side effect discoveries. In asking: could I run a binary mask over the text (that is to XOR 32 - which would flip the first letter case)...
