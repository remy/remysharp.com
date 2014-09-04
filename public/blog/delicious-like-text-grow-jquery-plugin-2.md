# del.icio.us-like Text Grow jQuery Plugin

If you're familiar with the [del.icio.us](http://del.icio.us/remy.sharp/) tag search box, then you'll know it will grow with the length of the content you enter.

This is particularly useful for search boxes or tagging entry boxes, though the only downfall (I think) of del.icio.us's entry box is that it can grow to become wider than the entire page width.

I've written a [jQuery](http://jquery.com) [plugin](http://jquery.com/plugins) that plugs the same functionality in to any text box - but also includes the max-width limiting functionality.

Download [textGrow.js](http://leftlogic.com/jquery/textgrow.js)


<!--more-->

## Example

See [Left Logic - text grow example](http://leftlogic.com/info/articles/auto_grow_text#example) - I couldn't post the JS code using my WordPress blog :-(

## Usage

`jQuery('input').textGrow({ pad: 25, min_width: 25, max_width: 300 });`

* pad: trailing padding in pixels - default 25
* min_width: minimum width of the text box in pixels
* max_width: maximum width of the text box in pixels

However, you don't need to pass the min and max width via the JavaScript, to offer even more flexibility this can be read through the CSS (and it's legal CSS too).  This will be read from the style attribute, or the class definitions in the CSS.

You can use min-width and max-width to apply specific control to text boxes, for example:

`<input type="text" style="min-width: 25px; max-width: 300px" name="s" />`

If you have any comments, bugs or suggestions please drop me a comment below.