# Adding BMPs to the Spectrum Next

The Spectrum Next has a dot command to load bitmaps, but there's a couple of tricks you need to pull off to be able to use it properly.

## 1. 8bit bitmap

First of all you'll need to get your image into an 8bit bitmap (.bmp files tend to come in the 24bit flavour).

You can do this in Photoshop (here's [the directions](https://medium.com/@chongfai13/convert-image-to-8bit-bmp-4634d732b218)) or you can use [online tools to convert](https://online-converting.com/image/convert2bmp/) an image to a bitmap.

The final image size wants to be 256x192.

## 2. Convert to Next friendly

The [zxnext_bmp_tools](https://github.com/stefanbylund/zxnext_bmp_tools) are needed. Windows users can download and use the .exe files, Mac and linux [can compile](https://github.com/stefanbylund/zxnext_bmp_tools#how-to-build) (it's a copy and paste job).

I copied these to `~/bin/` and include that path in my `$PATH`. Then using the default `nextbmp` without options will convert the file ready for the Next (no output means success):

```bash
$ nextbmp myimage.bmp
```

## 3. Using the image

I'm pretty sure the zxnext_bmp_tools output raw data that can be used, but in NextBASIC I'm using the dot command `.bmpload` as such:

```nextbasic
10 .bmpload myimage.bmp
20 PAUSE 0 :; wait for a keypress
```

The one thing to be aware of after this point is that (as far as I gather) `.bmpload` is changing the palette (to be able to load the bitmap), so if you have tiles or sprites you want to show, you'll need to reset this before your own colours work.

```nextbasic
10 .bmpload myimage.bmp
20 PAUSE 0 :; wait for a keypress
30 PALETTE CLEAR
```

Now everything after has the colours I expected.
