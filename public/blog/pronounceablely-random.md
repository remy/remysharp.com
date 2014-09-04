# Pronounceablely Random

If you work in a secure(ish) environment then you'll be changing passwords on a regular basis. An old colleague and I came up with a script that would generate a password based on fictional words from a dictionary lookup.

Then we/he realised that this could actually be generated on the fly, be completely random and still be pronounceable.


<!--more-->

The pattern to use is: vowel, consonant, vowel, consonant then vowel.  Once you've got your 5 letter password, we would append a 3 digit number on the end to really tighten the password (since these were used to access root accounts). For example:

<style type="text/css" media="screen">
  div.passwordExample p {
    text-align: center;
    font-family: Georgia, Times;
    margin: 50px 0!important;
    font-size: 400%;
  }
</style>
<script type="text/javascript" charset="utf-8">
function generatePassword(limit, inclNumbers) {
	var vowels = 'aeiou'.split('');
	var constonants = 'bcdfghjklmnpqrstvwxyz'.split('');
    var word = '', i, num;

    if (!limit) limit = 8;

    for (i = 0; i < (inclNumbers ? limit - 3 : limit); i++) {
        if (i % 2 == 0) { // even = vowels
            word += vowels[Math.floor(Math.random() * 4)]; 
        } else {
            word += constonants[Math.floor(Math.random() * 20)];
        } 
    }

    if (inclNumbers) {
    	num = Math.floor(Math.random() * 99) + '';
        if (num.length == 1) num = '00' + num;
        else if (num.length == 2) num = '0' + num;
    	word += num;
    }

	return word.substr(0, limit);
}

// wrap the numbers in a class to 
document.write('<div class="passwordExample"><p>' + generatePassword(5) + '</p></div>');
</script>
<noscript><p>You'll need JavaScript enabled to see the live example.</p></noscript>

The above example is based on the [JavaScript password generator](http://codedumper.com/password-generator-js).

The really nice thing about this process is that it can also be used to generate URLs and keep them pronounceable - which means you can *say* it to someone, and they should be able to type it out.  I use this code to generate the URLs for [Code Dumper](http://codedumper.com).

Here's the function for PHP:

<pre><code>function GeneratePassword( $limit = 8 ) {
  $vowels = array('a', 'e', 'i', 'o', 'u');
  $const = array('b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z');

  $word = '';

  for ($i = 0; $i &gt; ($limit - 3); $i++) {
    if ($i % 2 == 0) { // even = vowels
      $word .= $vowels[rand(0, 4)]; 
    } else {
      $word .= $const[rand(0, 20)];
    } 
  }

  $num = rand(0,999);
  str_pad($num, 3, '0', STR_PAD_LEFT);

  return substr($word . $num, 0, $limit);
}</code></pre>
