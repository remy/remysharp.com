# jQuery AJAX'ed forms

<p>Inspired by Dustin Diaz&#8217;s <a href="http://www.dustindiaz.com/screencast-05/">AJAX screencast</a>, I thought it was time I made a little more use of <a href="http://shinywhitebox.com/home/home.html">iShowU</a> and show how easy, and quick it can be to pile on some AJAX calories to pretty much any form.</p>

<p><span id="more-76"></span></p>

<p>The screencast is sans-sound, really just to try to keep my out-going bandwidth down, but I&#8217;ve commented along the way so you can understand (&#8230;hopefully&#8230;) what I&#8217;m doing, and why I&#8217;m doing it.</p>

<p><a href="http://remysharp.com/wp-content/uploads/2007/02/jquery_ajax_forms.mov">Download the QuickTime screencast, 9MB, a little over 10 minutes</a></p>

<p><small>If you can&#8217;t view the screencast, try <a href="http://www.divx.com/divx/webplayer/">DivX Web Player</a> for Windows or the Mac.</small></p>

<p>You can also have a look <a href="http://remysharp.com/wp-content/uploads/2007/02/contact.php.txt">the code used</a> in the screencast to have a play or to upgrade.</p>

<p>As always, let me know if you have any questions or suggestions.</p>

<div class="update">
    <p>Watch out for this gotcha that I just stumbled in to: if your form has an input element with the name 'action', the line <code>url: this.action</code> is going to grab that element, rather than the form's action.  Instead, use <code>this.getAttribute('action')</code></p>
</div>