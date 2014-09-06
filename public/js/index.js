/*global $,hljs*/
'use strict';
var comments = document.getElementById('disqus_thread');
var disqusLoaded = false;

function permalink(){
  'use strict';
  var $ = document.querySelectorAll.bind(document);

  var anchor = document.createElement('a');
  anchor.className = 'anchor';
  anchor.innerHTML = '<span class="permalink"></span>';

  [].forEach.call($('h1,h2,h3,h4,h5,h6'), function (el) {
    if (el.id) {
      var clone = anchor.cloneNode(true);
      clone.href = '#' + el.id;
      el.insertBefore(clone, el.firstChild);
    }
  });
}

if (document.querySelector && Function.prototype.bind) {
  permalink();
}

function loadDisqus() {
  var dsq = document.createElement('script');
  dsq.type = 'text/javascript';
  dsq.async = true;
  dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js'; // jshint ignore:line
  (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
  disqusLoaded = true;
}

//Get the offset of an object
function findTop(obj) {
  var curtop = 0;
  if (obj.offsetParent) {
    do {
        curtop += obj.offsetTop;
    } while (obj = obj.offsetParent); // jshint ignore:line
    return curtop;
  }
}

function flickrURL(photo) {
  return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_s.jpg';
}

function loadFlickr() {
  $.getJSON('https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=ac349179dc54279b846089f60586c263&user_id=38257258%40N00&per_page=12&format=json&jsoncallback=?', function (data) {

    var photos = data.photos.photo;
    var total = 8;

    var $ul = $('ul.flickr');

    photos.forEach(function (photo) {
      var img = new Image();
      img.src = flickrURL(photo);
      img.onload = function () {
        if (total === 0) {
          return;
        }

        total--;
        var $link = $('<a title="' + photo.title + '" href="http://www.flickr.com/photos/remysharp/' + photo.id + '">').append(this);

        $('<li>').append($link).appendTo($ul);
      };
    });
  });

}

if (window.location.hash.indexOf('#comments') > 0) {
  loadDisqus();
}

if (comments) {
  loadDisqus();
  var commentsOffset = findTop(comments);

  window.onscroll = function () {
    if(!disqusLoaded && window.pageYOffset > commentsOffset - 1500) {
      console.log('load comments, NOW!!');
      loadDisqus();
    }
  };
}

if ($('#index-page').length) {
  loadFlickr();
}

hljs.initHighlightingOnLoad();
$('.post').fitVids();