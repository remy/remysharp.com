/* eslint-env browser */
'use strict';
var comments = document.getElementById('disqus_thread');
var disqusLoaded = false;

const $$ = (s, context = document) => Array.from(context.querySelectorAll(s));
const $ = (s, context = document) => context.querySelector(s) || {};

// $$('.post-content > p').forEach(el => {
//   el.innerHTML = el.innerHTML.replace(/(\S+\s\S+)$/gm, '<nobr>$1</nobr>');
// });

const prompt = document.createElement('span');
prompt.className = 'bash-prompt';
prompt.innerHTML = '$ ';

$$('code.language-bash, code.language-sh, code.language-shell').forEach(el => {
  if (el.getAttribute('data-plain')) return;
  const firstChild = el.firstChild;
  if (firstChild.nodeName === '#text') {
    if (firstChild.nodeValue === '$ ') {
      el.replaceChild(prompt.cloneNode(true), firstChild);
    } else {
      el.insertBefore(prompt.cloneNode(true), firstChild);
      firstChild.nodeValue = firstChild.nodeValue.replace(/\$\s/, '');
    }
  } else {
    el.insertBefore(prompt.cloneNode(true), firstChild);
  }
});

function loadDisqus() {
  var dsq = document.createElement('script');
  dsq.type = 'text/javascript';
  dsq.async = true;
  dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js'; // jshint ignore:line
  (
    document.getElementsByTagName('head')[0] ||
    document.getElementsByTagName('body')[0]
  ).appendChild(dsq);
  disqusLoaded = true;
}

//Get the offset of an object
function findTop(obj) {
  var curtop = 0;
  if (obj.offsetParent) {
    do {
      curtop += obj.offsetTop;
    } while ((obj = obj.offsetParent)); // jshint ignore:line
    return curtop;
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

// try {
//   if (localStorage.plain) {
//     $('head').append('<link rel="stylesheet" href="/css/plain.css">');
//   }
// } catch (e) {}

if (comments) {
  loadDisqus();
  var commentsOffset = findTop(comments);

  window.onscroll = function() {
    if (!disqusLoaded && window.pageYOffset > commentsOffset - 1500) {
      loadDisqus();
    }
  };
}

if ($$('#index-page').length) {
  loadFlickr();
}

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
    // dear past Remy: why do you mix jQuery with vanilla DOM scripting?
    // Well…because vanilla is habbit, jQuery is just here as a helper.
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
