# Index Bitmaps

For a tool I've written for my Spectrum I need to port a PNG to an 8bit Bitmap. The process being copy the png image to an HTML5 canvas element, then extract the pixels then generate the bitmap header and arrange the image data appropriately.

I've always known about indexed palettes and their existence (as an option during exporting in Photoshop) but never really knew how they worked.

After rolling it by hand (without compression), it's rather obvious - though only in retrospect!

Generally (apparently) 8bit and below Bitmaps will include their own palette. This (I think/imagine) is because the size of the palette (in bytes) at 16bits would be larger than the data representing the pixels, so in 16bit and above, the actual colour is in the pixel byte (I could be totally wrong, but that'll be a TIL on 16bit images!).

An 8bit image (or smaller, such as 4bit) is structured thusly:

1. Header - contains dimensions, colour information, offsets, etc. 56 bytes.
2. Palette - if the colour count isn't defined (i.e. 0 in the header), then this will be 4 \* 256 (4 being alpha, blue, green, red - yes, in that order).
3. The pixel bytes referencing the palette

So what's interesting is that the pixel bytes are single bytes from the range of 0-255 which is an index of the palette. The palette range can be anything with an RGBA range.

A 4bit bitmap would use a "nibble" for the palette (and I'd expect it to be 512bytes, though I've not investigated them fully).

So that's what indexed palette is. It's 1K of colour data and the actual pixel data _points_ to the palette. Clever. Simple.
