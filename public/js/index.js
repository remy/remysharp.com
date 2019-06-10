/* eslint-env browser */
/* global disqus_shortname */
'use strict';
var comments = document.getElementById('disqus_thread');
var disqusLoaded = false;

const $$ = (s, context = document) => Array.from(context.querySelectorAll(s));
const $ = (s, context = document) => context.querySelector(s) || {};

const prompt = '<span class="bash-prompt">$ </span>';

if (typeof IntersectionObserver !== 'undefined') {
  var observer = new IntersectionObserver(function(changes) {
    if ('connection' in navigator && navigator.connection.saveData === true) {
      return;
    }
    changes.forEach(function(change) {
      if (change.isIntersecting) {
        change.target.setAttribute(
          'src',
          change.target.getAttribute('data-src')
        );
        observer.unobserve(change.target);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(function(img) {
    observer.observe(img);
  });
}

$$('code.language-bash, code.language-sh, code.language-shell').forEach(el => {
  if (el.getAttribute('data-plain') !== null) return;

  // add to all bash code examples
  if (!el.innerHTML.startsWith('$ ')) {
    el.innerHTML = prompt + el.innerHTML;
    return;
  }

  el.innerHTML = el.innerHTML
    .split('\n') // break into individual lines
    .map(line => line.replace(/^\$ /, prompt))
    .join('\n'); // join the lines back up
});

// function loadDisqus() {
//   var dsq = document.createElement('script');
//   dsq.type = 'text/javascript';
//   dsq.async = true;
//   dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js'; // jshint ignore:line
//   (
//     document.getElementsByTagName('head')[0] ||
//     document.getElementsByTagName('body')[0]
//   ).appendChild(dsq);
//   disqusLoaded = true;
// }

//Get the offset of an object
function findTop(obj) {
  var top = 0;
  if (obj.offsetParent) {
    do {
      top += obj.offsetTop;
    } while ((obj = obj.offsetParent)); // jshint ignore:line
    return top;
  }
}

function flickrURL(photo) {
  return (
    'https://farm' +
    photo.farm +
    '.staticflickr.com/' +
    photo.server +
    '/' +
    photo.id +
    '_' +
    photo.secret +
    '_q.jpg'
  );
}

function loadFlickr() {
  var script = document.createElement('script');
  script.src =
    'https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=ac349179dc54279b846089f60586c263&user_id=38257258%40N00&per_page=12&format=json&jsoncallback=flickrCallback';

  window.flickrCallback = function(data) {
    var photos = data.photos.photo;
    var total = 9;

    var $ul = $('ul.flickr');

    photos.forEach(function(photo) {
      var img = new Image();
      img.src = flickrURL(photo);
      img.setAttribute('alt', 'Photo of ' + photo.title);
      img.onload = function() {
        if (total === 0) {
          return;
        }

        total--;
        var $link =
          '<li><a href="http://www.flickr.com/photos/remysharp/' +
          photo.id +
          '"></li>';

        $ul.innerHTML += $link;
        var links = $$('a', $ul);
        var last = links[links.length - 1];
        last.appendChild(this);
      };
    });
  };

  document.body.appendChild(script);
}

if (window.location.hash.indexOf('#comments') > 0) {
  loadDisqus();
}

var searchOpen = false;
var searchForm = $('#inline-search');
$('#search').onclick = function(e) {
  e.preventDefault();
  searchOpen = false;
  searchForm.classList.toggle('show');
  if (searchForm.classList.contains('show')) {
    $('input[type="text"]', searchForm).focus();
    searchOpen = true;
  } else {
    $('input[type="text"]', searchForm).blur();
  }
};

$('body').onkeydown = function(event) {
  if (event.which === 80 && event.altKey) {
    localStorage.plain = localStorage.plain == 1 ? 0 : 1;
    if (localStorage.plain == 1) {
      $('head').append('<link rel="stylesheet" href="/css/plain.css">');
    } else {
      $('link[href="/css/plain.css"]').remove();
    }
  }
  if (searchOpen && event.which === 27) {
    $('#search').click();
  } else if (event.which === 191 && event.metaKey) {
    // ignore if we're in a form
    if (event.target.form) {
      return;
    }

    $('#search').click();
  }
};

if (comments) {
  loadDisqus();
  var commentsOffset = findTop(comments);

  window.onscroll = function() {
    if (!disqusLoaded && window.pageYOffset > commentsOffset - 1500) {
      loadDisqus();
    }
  };
}

// if we're on the homepage, then load flickr images
if ($$('#index-page').length) {
  loadFlickr();
}

// the edit link for blog posts
if (document.body.id.indexOf('blog-') === 0) {
  var h1First = $('h1');
  var html = `<small class="edit"><a href="${
    h1First.dataset.edit
  }">(edit)</a></small>`;

  h1First.onmouseover = () => {
    h1First.innerHTML += html;
    h1First.onmouseover = null;
  };
}

const fitVidSelector = [
  "iframe[src*='player.vimeo.com']",
  "iframe[src*='youtube.com']",
  "iframe[src*='youtube-nocookie.com']",
  "iframe[src*='kickstarter.com'][src*='video.html']",
  // 'video',
  'object',
  'embed',
].join(',');

$$(fitVidSelector).forEach(el => {
  var wrapper = document.createElement('div');
  wrapper.classList.add('video');

  // insert wrapper before el in the DOM tree
  el.parentNode.insertBefore(wrapper, el);

  // move el into wrapper
  wrapper.appendChild(el);
});

// sorry, knarly and lazy code, but it does the job.
$$('.runnable').forEach(function(pre) {
  var button = $('<button class="button">run</button>');
  var iframe = null;
  $(this).after(button);
  var running = false;
  button.on('click', function() {
    var code = pre.innerText;
    if (iframe || running) {
      iframe.parentNode.removeChild(iframe);
    }
    if (running) {
      button.text('run');
      iframe = null;
      running = false;
      return;
    }
    running = true;
    button.text('stop');
    iframe = document.createElement('iframe');
    iframe.className = 'runnable-frame';
    document.body.appendChild(iframe);
    iframe.contentWindow.eval(code);
  });
});
