# Delay the DOM ready event / Generate a dummy file

    dd if=/dev/zero of=dummy.file bs=1000000 count=1

This will generate a 1Mb (approx) file.  Useful for tests.  In my particular case, I'm trying to delay the DOM ready event in JavaScript - so I'm going load a large file in a script tag - which will load before the DOM ready is fired.

To delay the DOM ready event, I include the following as the very last (or near last) DOM element in the page - note the file is [cache busted](http://www.google.co.uk/search?q=define%3Acache+busting):

    <p>DOM ready being delayed - test now...</p>
    <script src="dummy.1mb.file?<?php echo rand(); ?>" type="text/javascript" charset="utf-8"></script>
    <p>DOM load complete.</p>