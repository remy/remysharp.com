# to hex

    d.toString(16)

Beautifully simple way to get a hex value from a number.  Note that `d` is a number.  If you want a string as a hex XML valid code, use:

    '&#x' + parseInt(number).toString(16).toUpperCase() + ';'