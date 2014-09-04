# CodeIgniter

If you've been [following me on Twitter](http://twitter.com/rem), then you'll know I've been [umm-ing and err-ing](http://twitter.com/rem/statuses/772475057) about [whether or not](http://twitter.com/rem/statuses/775168889) to use [CodeIgniter](http://codeigniter.com/ "CodeIgniter - Open source PHP web application framework"), the PHP framework.

It really boils down to this: I've built my own framework in PHP, which works the way I like - but I'm attracted to the code infrastructure support CodeIgniter (CI) can offer.

I thought I'd share the key lessons I learnt and show how I implemented the features I liked about my framework in to CI.


<!--more-->

## 1. Bespoke URL Handling

The real biggie for me was how URLs were handled.  I knew that the basic structure is:

<pre><code>[sitename]/[controller | blank]/[method]/[param1,etc]</code></pre>

e.g.

<pre><code>http://del.icio.us/user/remy.sharp</code></pre>

This would bring up my home page.  However, I prefer URLs that don't include superfluous info, like the <code>user</code> part:

<pre><code>http://del.icio.us/remy.sharp</code></pre>

The way this method works is failing to match any other controller, then checking the database for a valid X type of object (in this case user).

To achieve this in CI you, ideally, need to handle the <code>show_404</code> yourself.  Since that function is sitting in the <code>Common</code> library, we can subclass the <code>Router</code> class instead.

<pre><code>class MY_Router extends CI_Router {
  /**
   * Constructor
   */    
  function MY_Router() {   
    parent::CI_Router(); 
    
    log_message('debug', "Custom Router Class Initialized");
  }

  /**
   * Replaces the default show_404 logic flow in _validate_request
   * and returns our custom controller
   */  
  function missing_controller($segments) {
    $this->set_class('missing'); // <-- this is our custom 404 handler
    $this->set_method('index');
    return array('missing'); // <-- and again
  }
  
  /**
   * Taken directly from Router.php - to overload the 404 method
   */ 
  function _validate_request($segments) {
    // ... original code, except show_404() is replaced with:
    return $this->missing_controller($segments);
    // ... continues with original code, replacing all instances of show_404
  }
}</code></pre>

You can download my copy of [MY\_Router.php](/downloads/MY_Router.php) and it should live in your <code>application/libraries</code> directory.

## 2. Common Headers and Footers

My PHP framework would load everything sequentially - the OO approach that CI has attracted me, but I liked having the same header and footer always loading, handing their own navigation selection and login logic with me having to specify it in each controller.

CI's basic approach, if you did indeed split out the header and footer would be this for a controller <code>index</code> method:

<pre><code>function index() {
  $this->load->view('header');
  $this->load->view('welcome');
  $this->load->view('footer');
}</code></pre>

On top if which, I also like my controllers to be reused for the Ajax logic (as per my [Ajax pattern](http://remysharp.com/2008/01/12/ajax-validation-pattern/)), so typically I would sniff for the Ajax header and automatically skip over the header and footer.

This too can be achieve in CI with some subclassing.

I've subclassed the <code>Controller</code> class and I use <code>MY_Controller</code> as the base class the app controllers extend, like this:

<pre><code>class Home extends MY_Controller {
  function Home() {
    parent::MY_Controller();
    $this->page_title = 'Home!';
  }
  
  function index() {
    $data = array();
    
    if ($this->ajax) {
      if ($this->input->post('date')) {
        $this->load->model('Events');
        $data['json'] = (object)$this->Events->check($this->input->post('date'));
      }

      // the MY_Controller knows not to print the header + footer
      $this->view('json', $data);
    } else {
      $this->view('home');
    }
  }
}</code></pre>

MY\_Controller handles the Ajax aspect of the header and footer.  It handles whether to show a different header if the user is logged in.  It handles custom page titles, and it also gives me debug information on the page if I request it (which I'll explain next).

You can download my copy of [MY\_Controller.php](/downloads/MY_Controller.php), and again, it should live in your <code>application/libraries</code> directory.

The only subtle thing I've done differently to CI (and I'm sure if more experienced CI coder see this they may have an opinion that it's wrong), is that I've defined the privately scoped methods using <code>protected</code>.  I'm not a fan of the <code>_private</code> approach, and <code>protected</code> means the function can't be called from the URL<sup>&dagger;</sup>

<small>&dagger; If this is completely wrong - please let me know!</small>

## 3. Debugging Queries

Something that I've always built in to my web projects, is the ability to quickly pull up all the queries that ran on the page.  This is useful for debugging problems, checking data is being returned, optimisation, etc.

I couldn't easily see in the (rather excellent) [documentation to CI](http://codeigniter.com/user_guide/) how I could hook a print function after each query had ran...but a few minutes after giving up my search, I'm dipping through the <code>DB</code> code and found that it's take log of all the queries run.

So now I've got the information, and using [MY\_Controller.php](/downloads/MY_Controller.php), I can set my browser user-agent string to contain a trigger variable (since I can continue to browser the site normally and it will remain in debug mode), and it will output all the SQL run on the page via my [debug\_sql.php view](/downloads/debug_sql.php), inline with the content.

## 4. Next Up: Environment Aware Configs

My next job is to handle different environments for the config and database variables.  I'm sure this can be easily done, but I like to use a trigger file (so I'll do <code>touch htdocs/live</code>) that can be tested for that drives which config is loaded.  If this already exists and someone knows of it - please let me know!