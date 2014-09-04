# How to integrate OpenID as your login system

I've assumed you know what [OpenID](http://openid.net/what/) is, you're using your own [blog as your identity](http://simonwillison.net/2006/Dec/19/openid/) and now you want to offer a way for your users to log in your sexy new webapp using OpenID, or, as I've done in my code experiment [Todged](http://todged.com/) use it exclusively for logging in.

However, in developing the [log in system](http://todged.com/login) for Todged I found there was a lack of walk throughs on the Internet explaining how to plug OpenID in.  

Also, this tutorial aims answer the biggest (and simplest) question I had: how do you test OpenID?


<!--more-->

## OpenID Communication

There's no point in re-inventing the wheel, so [use someone else's library](http://wiki.openid.net/Libraries).  Since I'm working in PHP, I opted for 'SimpleOpenID' class in PHP, **however** it did not work entirely out of the box.

To get going, here's my copy of [SimpleOpenID.class.php](http://remysharp.com/downloads/SimpleOpenID.class.php).

## Database Setup: Say Goodbye to Password Storage

<script src="/js/prettify.packed.js" type="text/javascript" charset="utf-8"></script>

Again, I'm assuming for simplicity that we're using OpenID as our exclusive way in to the web site.  For example (my site) [Todged](http://todged.com) does this, and so does another site: [Jyte](http://jyte.com).

The result is the database table that holds the user details doesn't need to hold a password field.  It's a tricky concept to get around, but it's refreshing once you *get it*.

You need all the usual tables you would have in place, with the following additionals:

<pre><code class="prettyprint">alter table user_profile add column identity char(255) not null;

create table user_openids
(
  id int not null auto_increment,
  identity char(255) not null, # this our key field
  openid char(255) not null,
  server char(255) not null,  

  primary key (id),
  index openid (openid)
);</code></pre>

The <code>identity</code> field on <code>user_profile</code> (or what ever you name your table) is the key to allowing users to have multiple OpenIDs pointing to one single identity.

The <code>user_openids</code> is important because it will allow the following (types of) relationships:

* OpenID: http://remysharp.myopenid.com/ => Identity: remysharp.myopenid.com
* OpenID: remysharp.myopenid.com => Identity: remysharp.myopenid.com
* OpenID: http://remysharp.myopenid.com => Identity: remysharp.myopenid.com
* OpenID: http://remysharp.com => Identity: remysharp.myopenid.com (since remysharp.com is a delegate)
* etc.

As you can see, since the OpenID is a URI, it's possible for a range of different OpenID URIs representing **one single** identity.

The <code>user_openids</code> table will allow us to store the relationships and save having to lookup the identity against the OpenID each time they log in<sup>&dagger;</sup> (which is doing by running an HTTP request).

<small>&dagger; Note that this does mean if the user changes the service they host their identity with, they may not be able to log in, so you could argue these rows should have an expiry to them.</small>

## OpenID Login Steps

If you're familiar with these steps, skip onwards, otherwise it's worth understanding these steps because it will help you debug any future problems you might hit.

1. User enters their OpenID.
2. Server checks to see if the OpenID is a delegate, if so, it finds the source OpenID server and redirects the user as appropriate (i.e. to login and to allow access).
3. The OpenID will redirect the user back to our server<sup>&dagger;&dagger;</sup>
4. Our server will now run a callback to the OpenID server which authenticates the whole process.
5. If the OpenID responds with 'ok', we'll proceed, otherwise, there was some problem with the log in process.

<small>&dagger;&dagger; It's important that the domain redirects correctly, otherwise this step won't work.  For instance, I had the OpenID server redirecting back to www.todged.com rather than todged.com (without the www) which broke the redirect (since [I don't support 'www'](http://remysharp.com/2006/09/08/dub-dub-dub-or-how-we-pronounce-the-world-wide-web/)).</small>

## OpenID Login Code

Armed with this information, and the knowledge that we'll have to handle two steps of the login process, here's the code.

Note that this is the code (pretty much) directly from the [Todged login process](http://todged.com/login).

### The Initial Login Request

<pre><code class="prettyprint">$openid = new SimpleOpenID;
// $_REQUEST['openid'] is the input field the user submitted
$openid-&gt;SetIdentity($_REQUEST['openid']);

// ApprovedURL is the url we want to call back to
$openid-&gt;SetApprovedURL('http://todged.com/login');
$openid-&gt;SetTrustRoot('http://todged.com');

// I'm also requesting their email address for the creation of their new profile
$openid-&gt;SetOptionalFields('email');

// User::GetOpenIDServer checks the database table 'user_openids' for the 
// user's openid and the associated identity, which saves having to run
// a separate HTTP request if it's not available (see else case).
if (list($server, $identity) = User::GetOpenIDServer($_REQUEST['openid'])) {
  $openid-&gt;SetOpenIDServer($server);
  $openid-&gt;SetIdentity($identity);
} else {
  // 
  if ($server = $openid-&gt;GetOpenIDServer()) {
    // just used to optimise the process
    $identity = $openid-&gt;GetIdentity();
    
    // we're now creating a relationship between the user's OpenID and their
    // *real* identity which can be used in subsequent logins to save time.
    User::SaveOpenIDServer($_REQUEST['openid'], $server, $identity);
  } else {
    // This shouldn't happen - but will if there's something fundamentally wrong 
    // with our request.  Examples in Debugging section of this tutorial.
    user_error('Something has gone wrong with OpenID identity request process');
  }
}

// send the user to their OpenID provider for authentication
$openid-&gt;Redirect();
</code></pre>

### Handling the OpenID Server Response

<pre><code class="prettyprint">$openid = new SimpleOpenID;
$identity = $_GET['openid_identity'];

$openid-&gt;SetIdentity($identity);
$ok = $openid-&gt;ValidateWithServer();

if ($ok) {
  /**
   * Tasks:
   * If user doesn't exist (tested by LoadByOpenID) - create an account
   * If they're new - send them to an activate page with appropriate captcha logic
   * If they existed already, redirect to their home page
   */
  
  // tries to load a user profile using their openid identity,
  // standard stuff, that would normally be by username.
  if (!$User-&gt;LoadUserByOpenID($identity)) {
    // create a new user
    $User-&gt;CreateUserFromOpenID($identity, $_GET['openid_sreg_email']);
    
    // ask the user, as a once off, to prove they're human.
    Utility::Redirect('/activate');
  } else {
    // redirect the user to their home page
    Utility::Redirect('/' . $User-&gt;username);
  }
} else if ($openid-&gt;IsError() == true) {
  // There was a problem logging in.  This is captured in $error (do a var_dump for details)
  $error = $openid-&gt;GetError();
  
  $msg = "OpenID auth problem\nCode: {$error['code']}\nDescription: {$error['description']}\nOpenID: {$identity}\n";
  
  // error message handling is done further along in the code, but ensure the user
  // can pass on as much information as possible to replicate the bug.
} else { 
  // General error, not due to comms
  $Error = 'Authorisation failed, please check the credentials entered and double check the use of caplocks.';
}</code></pre>

## How to Test OpenID

Though it's not detailed anywhere, it's actually simple.  There's nothing to do or configure or anything.  Testing will work, so long as the OpenID server can redirect the browser back to your server, be it online or offline.

## Problems I Encountered

I've provided my own copy of [SimpleOpenID.class.php](http://remysharp.com/downloads/SimpleOpenID.class.php) because I had to patch it to work with all the [examples](http://openid.net/get/) on the OpenID site.

The OpenID site provides a good list of examples where a user may [already have an OpenID](http://openid.net/get/).  So I used this as my test cases.

### WordPress OpenID Problems

This bug might not just be exclusive to SimpleOpenID, since WordPress HTML isn't totally valid XHTML the parser looking for the 'openid.server' field didn't match.

It's because WordPress includes the OpenID as:

<pre><code>&lt;link rel='openid.server' href='http://remysharp.wordpress.com/?openidserver=1' /&gt;</code></pre>

Rather than:

<pre><code>&lt;link rel=<strong>"</strong>openid.server<strong>"</strong> href=<strong>"</strong>http://remysharp.wordpress.com/?openidserver=1<strong>"</strong> /&gt;</code></pre>

The trick is to make sure your parser isn't picky about XHTML.

The second problem I had with WordPress was that WordPress's OpenID server absolutely requires a trailing slash on the identity.

For example, sending <em>http://remysharp.wordpress.com</em> as the identity doesn't work.  However, <em>http://remysharp.wordpress.com/</em> does work.

### Technorati OpenID Problems

From the examples over at [openid.net/get/](http://openid.net/get/) is says Technorati supports OpenID with all accounts.  However, they're very strict about the OpenID. 

For example, the OpenID <em>technorati.com/people/technorati/remysharp</em> wouldn't work, and would serve a Technorati page saying the content had be lost.  

It took me a while to realise the 'http://' part was mandatory.  So <em>http://technorati.com/people/technorati/remysharp</em> does work.

## Wrap Up

Hopefully this has helped anyone worried about the requirements of adding OpenID to their site, and I'd love to see more sites using it.