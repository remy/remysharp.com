# Unpacking bytes

Over the years it's been possible to process raw data using JavaScript. I remember the days of the `XMLHttpRequest` hacks that would munge through data to support in-browser zip compression and decompression - heady days! Processing raw bytes these days is, comparatively, a lot simpler - made possible through the `ArrayBuffer` APIs and typed arrays.

Historically I come from a Perl background, and in Perl were two functions called `unpack` and `pack`. Using a string based template, they would decode raw bytes into usable variables (and pack would _pack_ the values into a byte array). So, for kicks and partly because I needed it for a _play project_, I wrote a (nearly) port of `unpack` in JavaScript.

<!--more-->

## Caveat: remy's unpack < perl's unpack

The original `pack` and `unpack` functions in Perl served a multitude of applications, and it's fair to say that this pair of functions weren't popular and often misunderstood (frankly, Perl being littered with `$_`, `@_`, `/`, `<>` and a mass of brackets and slashes didn't help matters either).

The Perl functions have **a lot** of support for different data types and doing clever things like include sub-templates, checksum features and a little more. I've ported a large chunk of these features, trying to map the original implementation, but not absolutely everything is replicated. Side note: the project is [on github](https://github.com/remy/unpack), so if there's something you'd like to see included, please send a pull request or file an issue 🙏

## Usage

My `unpack` function takes a template, some data and an optional offset.

## Getting file bytes

Before you can unpack bytes, you might want to read a file into a byte array. There's a few ways that you can do this in JavaScript. The first is using the `fetch` API and the second is if the user is giving you the file, you can use the `FileReader` API (either via an `input[type=file]` or drag and drop event).

Getting bytes using `fetch`:

```js
function dataFromFetch(url) {
  return fetch(url).then(res => res.arrayBuffer());
}

const data = await dataFromFetch(url);
```

Using the `FileReader` API:

```js
function dataFromEvent(source) {
  let file = null;
  if (source.dataTransfer) { // drag and drop event
    file = source.dataTransfer.files[0];
  } else { // input[type] element
    file = source.files[0];
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = event => resolve(event.target.result);
    reader.readAsArrayBuffer(file);
  });
}

const data = await dataFromEvent(inputFileElement);
```

So now that we know how to _get_ the bytes, how about unpacking them.

## Examples

Many types of files include metadata, some will have just a signature to declare what kind of file they are, others will include more detail, like mp3 files often include song title, artist and even actual artwork. A gif will include the GIF compression version and image resolution.

### MP3 ID3

The ID3 standard has [multiple versions](http://id3.org/Developer%20Information). The "simplest" is included at the last 128 bytes of the file as per [ID3v1](http://id3.org/ID3v1).

An MP3 ID3 header exists in the last 128 bytes of an MP3 file. So the template is given the `length - 128` as an offset and the template itself is:

```
unpack(`
  x3
  a30$title
  a30$artist
  a30$album
  a4$year
  a28$comment
  c$hasTrack
  c$trackNumber
  c$genreId`,
  mp3, mp3.byteLength - 128);
//
```


### Binary & flags

The following unpacks the binary value used in a ZX Spectrum attribute byte (yes, I'm obsessive about the ZX Spectrum and it's bytes), this byte controlled the style of a single 8x8 block on the screen:

```js
unpack('b$flash b$bright b3$paper b3$ink', 75); // aka 0b01001011
// { flash: 0, bright: 1, paper: 5, ink: 3 }
```

## The gist

I wrote a small library that does this work for me published on npm under [@remy/unpack](https://npmjs.com/@remy/unpack). The general gist of the unpack library goes like this (pseudo code):

```js
function unpack(template, data) {
  const result = {}; // we'll populate this

  let position = 0;
  let token = null;

  while (token = parseNextToken(template)) {

    const {
      length,
      id,
      endian,
      viewMethod
    } = token;

    const view = new DataView(data, position, position + length);

    // this vastly simplified as there are more
    // types supported in the real library
    switch (request.dataType.character) {
      case 'a':
      case 'A':
        result[id] = new TextDecoder()
          .decode(view)
          // `A` means pad with spaces, `a` means pad with null
          .padEnd(length, c === 'A' ? ' ' : '\0');
        break;
      default:
        result[id] = view[`get${viewMethod}`](0, endian);
        break;
    }

    position += length; // move the pointer forward
  }

  return result;
}
```

What I find really nice about this is that I'm able to use the typed array support that JavaScript has had for some time now (though for years I couldn't see _why_ I'd use typed arrays).

By putting the array buffer in a `DataView`, I am then able to retrieve the bytes using a number of different methods: unsigned 8 bit byte (or _char_), or signed 16 bit integer (or _word_), or a double precision 64 bit float - and so on. Also because I'm using the `getUint8` (like) methods, I can also set the [endianness](https://en.wikipedia.org/wiki/Endianness) very easily in the method call.
