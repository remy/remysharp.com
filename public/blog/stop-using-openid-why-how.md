# Stop Using OpenID - Why & How

Personally I think that OpenID is the next best thing since sliced bread. I plan to use it on all my [personal projects](http://codedumper.com) and advocate it whenever I can.

However, when I have to explain OpenID, and *if* they understood, it then raises a foray of debate - which is fine, but I don't want to argue just to get my user to log in.

My approach from here on in is to stop using OpenID.  That is I'll reduce the presence of OpenID at the front line (i.e. what the user sees) but continue as it suites me behind the scenes.


<!--more-->

## Why?

* Your user should not care, or even have to know about OpenID.
* It saves having to go in to the whole explanation of what OpenID is.  My new explanation goes a little like this:

> You have a Flickr account, right?

> *Right.*

> Well, you just use your username on my site, Flickr will authenticate you, proving you're really who you say you are, and on you go.

> *Tidy.*

* OpenIDs can sometimes be tricky to remember/get right.  

For example, [Technorati's](http://technorati.com/pop/blogs/ "Technorati Popular: Top 100 blogs") OpenID caused me no end of problems.  It boiled down to the Technorati OpenID **requiring** 'http://' at the start - whereas I can happily use 'remysharp.com' as my OpenID - regardless of the 'http' part.

In addition 'http://technorati.com/people/technorati/remysharp' is fairly long to type.


## How?

The 'how' should make it even easier to get those users in to your web site.  Since some of the [big boys](http://openid.net/get/) offer OpenID as part of your account, I'm going to assume that there's a large proportion of users who have an OpenID without knowing it.

* Don't ask for OpenID urls: just ask for the username for X service, and construct the OpenID behind the scenes.

Have a look at the following example (taken from [Code Dumper's login](http://codedumper.com/login)): 

<style type="text/css" media="screen">input#openid {
  padding-left: 35px;
  background: #FFFFFF url('http://remysharp.com/images/login-methods.gif') no-repeat scroll 7px 8px;
} input#openid.openid {
  background-position: 6px 8px;
} input#openid.aol {
  background-position: 6px -17px;
} input#openid.smugmug {
  background-position: 6px -95px;
} input#openid.livejournal {
  background-position: 6px -44px;
} input#openid.technorati {
  background-position: 6px -122px;
} input#openid.vox {
  background-position: 6px -154px;
} input#openid.wordpress {
  background-position: 6px -70px;
} input#openid.flickr {
  background-position: 6px -182px;
} input#openid.blogger {
  background-position: 6px -211px;
} #realOpenId {
  color: #666;
  font-weight: bold;
  padding-top: 10px;
}</style>

<script type="text/javascript" charset="utf-8">
function openIDForm() {
    var label = null;

    if (this.value == '') {
        label = $('#openid').css('background-image', '').removeAttr('class').prev();
        label.text('OpenID:');
        
    } else {
        label = $('#openid').removeAttr('class').addClass(this.value).prev();
        label.text('Username:');
    }
    
    updateRealOpenID();
}

function updateRealOpenID() {
  var openid = $('#openid').val() || 'openid';
  var url = $('#openidProvider :selected').text();
  var sel = $('#openidProvider :selected').val();
  switch (sel) {
    case 'livejournal' :
    case 'smugmug' :
    case 'vox' :
      openid += '.' + url;
      break;
    case 'wordpress' :
    case 'blogger' : 
      openid += '.' + url + '/';
      break;
    case 'technorati' :
      openid = 'http://technorati.com/people/technorati/' + openid;
      break;
    case 'flickr' : 
      openid = 'www.flickr.com/photos/' + openid;
      break;
    case 'aol' : 
      openid = 'openid.aol.com/' + openid;
      break;
  }
  
  $('#realOpenId span').text(openid);
}

$(function () {
  $('#openidProvider')
    .change(openIDForm)
    .keyup(openIDForm)
    .change()
    .find('option')
    .each(function () {
      $(this).css({
        'padding-left' : '24px',
        'background' : 'url(http://www.' + this.text + '/favicon.ico) no-repeat 2px'
      });
    })
    .filter(':last').css({
      'padding-left' : '24px',
      'background' : 'url(http://remysharp.com/images/login-methods.gif) no-repeat scroll 0px 0px;'
    });
    $('#openid').keyup(updateRealOpenID).change(updateRealOpenID);
});
</script>

<noscript><p>You'll need to have JavaScript enabled to view the demo.</p></noscript>
<fieldset>
    <legend>Sign in</legend>
    <div>
        <label id="openid-label" for="openid">OpenID:</label>
        <input type="text" name="openid_identifier" value="remysharp" class="openid" id="openid" />
        <select id="openidProvider" name="openid-provider" style="width: 265px;  ">
            <option value="">or do you have one of these accounts?</option>                
            <optgroup>
            <option value="aol">aol.com</option>
<option value="flickr">flickr.com</option>
<option value="blogger">blogger.com</option>
<option value="wordpress">wordpress.com</option>
<option value="technorati">technorati.com</option>
<option value="livejournal">livejournal.com</option>
<option value="smugmug">smugmug.com</option>
<option value="vox">vox.com</option>
            </optgroup>
            <option value="">Use my own OpenID provider</option>
        </select>
    </div>
    <div id="realOpenId">Behind the scenes OpenID is: <span>xxx</span></div>
</fieldset>

This example still initially points the user to an OpenID login (I'd love to get a UI designer's direction on this) - but the key effect is the ability for the user to select their login and **only** specify their username.

* Use a cookie to store the selection of services the user chose.  I don't want to have to keep selecting the right service from the drop down each time I log in.
* If you can add visuals on the login: icons for AOL, Flickr, Blogger, Yahoo, etc, will immediately connect people's understanding that they're logging in to that service, not only in the input field as above, but perhaps horizontally introducing the log in.

Next time I'll show you how to glean an avatar for your user without any input from them.