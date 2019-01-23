# DataView: Unpacking bits

Over the last few years I've been playing around at the byte level with JavaScript, processing, parsing and manipulating bits and bytes for projects like my [ZX Spectrum loading screen talk](https://www.youtube.com/watch?v=lQMcZtiaD0A).

In JavaScript, as part of part of the typed arrays support, comes the `DataView` API which makes parsing out bytes relatively simple compared to the days of magic bitwise operations and shifting.

<!--more-->

## My use case: extract bytes from files

In my particular case I was processing ZX Spectrum .TAP based files - these files are from the demodulated audio off a cassette (_mostly_).

My task was to extract the loading screen that's contained inside the .TAP file (beyond the loading screen were the instructions for the actual game or program).

This is the header description (as documented on a ZX Wiki site):

```
      |------ Spectrum-generated data -------|       |---------|

13 00 00 03 52 4f 4d 7x20 02 00 00 00 00 80 f1 04 00 ff f3 af a3

^^^^^...... first block is 19 bytes (17 bytes+flag+checksum)
      ^^... flag byte (A reg, 00 for headers, ff for data blocks)
         ^^ first byte of header, indicating a code block

file name ..^^^^^^^^^^^^^
header info ..............^^^^^^^^^^^^^^^^^
checksum of header .........................^^
length of second block ........................^^^^^
flag byte ...........................................^^
first two bytes of rom .................................^^^^^
checksum (checkbittoggle would be a better name!).............^^
```
