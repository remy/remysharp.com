/* eslint-env browser */
/* global whenReady */
const $$ = (s, context = document) => Array.from(context.querySelectorAll(s));
const $ = (s, context = document) => context.querySelector(s) || {};

try {
  $$('.needs-js').forEach((_) => _.classList.remove('needs-js'));
} catch (e) {}

// detect native/existing fragmention support
function fragmention() {
  // set stashed element
  let element;

  // return first element in scope containing case-sensitive text
  function getElementsByText(scope, text) {
    // iterate descendants of scope
    for (
      var all = scope.childNodes, index = 0, element, list = [];
      (element = all[index]);
      ++index
    ) {
      // conditionally return element containing visible, whitespace-insensitive, case-sensitive text (a match)
      if (
        element.nodeType === 1 &&
        (element.innerText || element.textContent || '')
          .replace(/\s+/g, ' ')
          .indexOf(text) !== -1
      ) {
        list = list.concat(getElementsByText(element, text));
      }
    }

    // return scope (no match)
    return list.length ? list : scope;
  }

  function getAnchorableElementByName(fragment) {
    var elements = document.getElementsByName(fragment),
      index = -1;

    while (elements[++index] && !/^A(REA)?$/.test(elements[index].nodeName)) {
      //noop
    }

    return elements[index];
  }

  // on dom ready or hash change
  function onHashChange() {
    // do nothing if the dom is not ready
    if (!/e/.test(document.readyState)) return;

    // conditionally remove stashed element fragmention attribute
    if (element) {
      element.removeAttribute('fragmention');
    }

    // set location fragmention as uri-decoded text (from href, as hash may be decoded)
    const id = location.hash.substring(1);
    var node =
      document.getElementById('#' + id) || getAnchorableElementByName('#' + id);

    if (node) {
      return;
    }

    let fragmention = decodeURIComponent(id);

    const spec = ':~:text=';

    // if the fragment does not start with targetText AND does not include
    // spaces, then it'll be ignored - based on convo between indieweb spec
    // and w3c proposal
    // https://github.com/WICG/ScrollToTextFragment/issues/5
    if (!fragmention.indexOf(spec) === 0 && fragmention.indexOf(' ') === -1) {
      return;
    }

    if (
      fragmention.indexOf(spec) === 0 ||
      fragmention.indexOf('#' + spec) === 0
    ) {
      const add = fragmention[0] === '#' ? 1 : 0;
      fragmention = fragmention.substring(spec.length + add);
    }

    // if fragmention exists
    if (fragmention) {
      var // get all elements containing text (or document)
        elements = getElementsByText(document, fragmention),
        // get total number of elements
        length = elements.length,
        // get index of element
        modulus = length && 0 % length, // RS not 100% sure what the fragIndex was for
        index = length && modulus >= 0 ? modulus : length + modulus;

      // get element
      element = length && elements[index];

      // if element found
      if (element) {
        // scroll to element
        element.scrollIntoView({ behavior: 'smooth' });

        // set fragmention attribute
        element.setAttribute('fragmention', '');
      } else {
        element = null;
      }
    }
  }

  // add listeners
  window.addEventListener('hashchange', onHashChange);
  document.addEventListener('readystatechange', onHashChange);

  onHashChange();

  document.addEventListener('selectionchange', () => {
    if (element) {
      element.removeAttribute('fragmention');
    }
    const selection = document.getSelection().toString().trim();

    if (selection.indexOf(' ') !== -1) {
      let url = location.toString();
      if (!url.includes('#')) {
        url += '#';
      }
      url += ':~:text=' + encodeURIComponent(selection);

      history.replaceState(null, null, url);
    } else {
      history.replaceState(null, null, location.toString());
    }
  });
}

function observerImages() {
  if (typeof IntersectionObserver !== 'undefined') {
    var observer = new IntersectionObserver(function (changes) {
      if ('connection' in navigator && navigator.connection.saveData === true) {
        return;
      }
      changes.forEach(function (change) {
        if (change.isIntersecting) {
          change.target.setAttribute(
            'src',
            change.target.getAttribute('data-src')
          );
          observer.unobserve(change.target);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(function (img) {
      observer.observe(img);
    });
  }
}

observerImages();

const prompt = '<span class="bash-prompt">$ </span>';
$$('code.language-bash, code.language-sh, code.language-shell').forEach(
  (el) => {
    if (el.getAttribute('data-plain') !== null) return;

    // add to all bash code examples
    if (!el.innerHTML.startsWith('$ ')) {
      el.innerHTML = prompt + el.innerHTML;
      return;
    }

    el.innerHTML = el.innerHTML
      .split('\n') // break into individual lines
      .map((line) => line.replace(/^\$ /, prompt))
      .join('\n'); // join the lines back up
  }
);

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

  window.flickrCallback = function (data) {
    var photos = data.photos.photo;
    var total = 9;

    var $ul = $('ul.flickr');

    photos.forEach(function (photo) {
      var img = new Image();
      img.src = flickrURL(photo);
      img.setAttribute('alt', 'Photo of ' + photo.title);
      img.onload = function () {
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

var searchOpen = false;
var searchForm = $('#inline-search');
$('#search').onclick = function (e) {
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

/**
 * Handles keyboard shortcuts for toggling plain mode and search.
 * @param {KeyboardEvent} event
 */
$('body').addEventListener('keydown', (event) => {
  if (
    event.key === 's' &&
    !['INPUT', 'TEXTAREA'].includes(event.target.tagName)
  ) {
    startScreensaver();
  }

  if (event.key === 'Escape') {
    if (screensaverActive) {
      dismissScreensaver();
    }
  }

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
});

function addFiltering() {
  const filter = $('#filter-posts');

  if (!filter.nodeName) return;

  filter.addEventListener('change', (e) => {
    const hidden = !e.target.checked;
    const name = e.target.name;
    $$(`.post-content li[data-type^="${name}"]`).forEach(
      (_) => (_.hidden = hidden)
    );
    localStorage.setItem('archive.' + name, hidden ? '0' : '1');
  });

  // if cookies locked down, this will throw
  try {
    $$('input', filter).forEach((input) => {
      const name = input.name;
      if (localStorage.getItem('archive.' + name) === '0') {
        input.checked = false;
        $$(`.post-content li[data-type^="${name}"]`).forEach(
          (_) => (_.hidden = true)
        );
      }
    });
  } catch (e) {}
}

addFiltering();

// if we're on the homepage, then load flickr images
if ($$('#index-page').length) {
  loadFlickr();
}

// // the edit link for blog posts
// if (document.body.id.indexOf('blog-') === 0) {
//   var h1First = $('h1');
//   var html = `<small class="edit"><a href="${
//     h1First.dataset.edit
//   }">(edit)</a></small>`;

//   h1First.onmouseover = () => {
//     h1First.innerHTML += html;
//     h1First.onmouseover = null;
//   };
// }

const fitVidSelector = [
  "iframe[src*='player.vimeo.com']",
  "iframe[src*='youtube.com']",
  "iframe[src*='youtube-nocookie.com']",
  "iframe[src*='kickstarter.com'][src*='video.html']",
  // 'video',
  'object',
  'embed',
].join(',');

$$(fitVidSelector).forEach((el) => {
  var wrapper = document.createElement('div');
  wrapper.classList.add('video');

  // insert wrapper before el in the DOM tree
  el.parentNode.insertBefore(wrapper, el);

  // move el into wrapper
  wrapper.appendChild(el);
});

function formatDate(date) {
  const month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  return `${date.getDay()}-${month[date.getMonth()]} ${date.getFullYear()}`;
}

const today = new Date();
today.setHours(0, 0, 0, 0);

function daysAgo(date) {
  date.setHours(0, 0, 0, 0);
  const time = date.getTime();
  const now = today.getTime();
  const delta = ((now - time) / 1000 / 60 / 60 / 24) | 0;

  if (delta < 1) {
    return 'today';
  }

  if (delta === 1) {
    return 'yesterday';
  }

  return `${delta | 0} days ago`;
}

// called on the offline page
async function listPages() {
  // Get a list of all of the caches for this origin
  const cacheNames = await caches.keys();
  const result = [];

  for (const name of cacheNames) {
    // Open the cache
    if (name.includes('/posts')) {
      const cache = await caches.open(name);

      // Get a list of entries. Each item is a Request object
      for (const request of await cache.keys()) {
        const url = request.url;
        const match = url.match(/\/(\d{4})\/(\d{2})\/(\d{2})\//);
        // If the request URL matches, add the response to the result
        if (match) {
          const post = await cache.match(request);
          const body = await post.text();
          const title = body.match(/<title>(.*)<\/title>/)[1];
          result.push({
            url,
            post,
            title,
            published: new Date(match.slice(1).join('-')),
            visited: new Date(post.headers.get('date')),
          });
        }
      }
    }
  }

  const el = $('#offline-posts');

  if (result.length) {
    el.innerHTML = result
      .sort((a, b) => {
        return a.published.toJSON() < b.published.toJSON() ? 1 : -1;
      })
      .map((res) => {
        let html = `<li><a href="${res.url}">${
          res.title
        }</a> <small class="date">${formatDate(
          res.published
        )} <span title="${res.visited.toString()}">(visited ${daysAgo(
          res.visited
        )})</span></small></li>`;
        return html;
      })
      .join('\n');
  }

  return result;
}

// sorry, knarly and lazy code, but it does the job.
// $$('.runnable').forEach(function(pre) {
//   var button = $('<button class="button">run</button>');
//   var iframe = null;
//   $(this).after(button);
//   var running = false;
//   button.on('click', function() {
//     var code = pre.innerText;
//     if (iframe || running) {
//       iframe.parentNode.removeChild(iframe);
//     }
//     if (running) {
//       button.text('run');
//       iframe = null;
//       running = false;
//       return;
//     }
//     running = true;
//     button.text('stop');
//     iframe = document.createElement('iframe');
//     iframe.className = 'runnable-frame';
//     document.body.appendChild(iframe);
//     iframe.contentWindow.eval(code);
//   });
// });

navigator.serviceWorker.onmessage = function (event) {
  var message = JSON.parse(event.data);
  if (message.type === 'offline') {
    if (message.value === false) {
      console.log('currently offline');
    }
  }
};

// this isn't working properly
// fragmention();

// expose the artwork!
if (location.hostname !== 'localhost')
  setTimeout(
    () => console.log($('script[type="awesome/sauce"]').innerText),
    100
  );

whenReady.push(() => {
  const article = document.querySelector('article');
  if (!article) return;

  const walker = document.createTreeWalker(article, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => {
      if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  while (walker.nextNode()) {
    const node = walker.currentNode;
    const match = node.nodeValue.match(/(w|W)/);
    if (node.parentElement.tagName === 'A') {
      // skip if it's a link
      continue;
    }
    if (match) {
      const index = match.index;
      const char = node.nodeValue[index];

      const before = node.nodeValue.slice(0, index);
      const after = node.nodeValue.slice(index + 1);

      const frag = document.createDocumentFragment();
      if (before) frag.appendChild(document.createTextNode(before));

      const span = document.createElement('span');
      span.textContent = char;
      span.style.cursor = 'pointer';
      span.title = 'Do not click me, weird shit will happen';
      span.onclick = wibble;
      frag.appendChild(span);

      if (after) frag.appendChild(document.createTextNode(after));

      node.parentNode.replaceChild(frag, node);
      break;
    }
  }
});

if (whenReady.length) {
  whenReady.forEach((fn) => fn());
}

// now, find the first `w` letter (lower or upper) and make it so that if you click on it, it'll call the `wibble` function. The cursor should also change to a pointer, but it's not a link, and it shouldn't break the word it's part of

function wibble() {
  if (wibble.running) return;
  wibble.running = true;
  const css = `
    * {
      cursor: default !important;
    }
    span.word {
      display: inline-block;
      white-space: nowrap;
    }
    span.char {
      display: inline-block;
      transition: transform 0.2s;
      transform-origin: center center;
      will-change: transform;
    }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  const skipTags = ['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'CODE', 'PRE'];

  function wrapCharsByWord(node) {
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => {
        if (!n.textContent.trim()) return NodeFilter.FILTER_REJECT;
        if (skipTags.includes(n.parentElement.tagName))
          return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    });

    const toProcess = [];
    while (walker.nextNode()) toProcess.push(walker.currentNode);

    toProcess.forEach((textNode) => {
      const frag = document.createDocumentFragment();
      const parts = textNode.textContent.split(/(\s+)/); // keep spaces

      parts.forEach((part) => {
        if (/^\s+$/.test(part)) {
          frag.appendChild(document.createTextNode(part));
        } else {
          const wordSpan = document.createElement('span');
          wordSpan.className = 'word';
          for (const char of part) {
            const cSpan = document.createElement('span');
            cSpan.className = 'char';
            cSpan.textContent = char;
            wordSpan.appendChild(cSpan);
          }
          frag.appendChild(wordSpan);
        }
      });

      textNode.replaceWith(frag);
    });
  }

  wrapCharsByWord(document.body);

  const chars = document.querySelectorAll('span.char');

  document.addEventListener('mousemove', (e) => {
    const lensRadius = 150;
    const maxScale = 2;

    chars.forEach((span) => {
      const r = span.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;

      const dx = cx - e.clientX;
      const dy = cy - e.clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < lensRadius) {
        const strength = 1 - dist / lensRadius;
        const scale = 1 + (maxScale - 1) * strength;
        const repel = 12 * strength * strength;
        const tx = (dx / dist) * repel;
        const ty = (dy / dist) * repel;

        span.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
      } else {
        span.style.transform = 'none';
      }
    });
  });
}

let screensaverActive = false;

let idleTimer;
const maxTimeout = 10 * 60 * 1000; // 10 minutes in milliseconds
const timeoutIntervals = [maxTimeout, maxTimeout * 2, maxTimeout * 30];

// Listen for screensaver dismissal events from other tabs
window.addEventListener('storage', (e) => {
  if (e.key === 'screensaver-dismissed' && screensaverActive) {
    screensaverActive = false;
    const screensaver = $('#screensaver');
    if (screensaver) document.body.removeChild(screensaver);
  }
});

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    idleTimer = setTimeout(() => {
      startScreensaver();
    }, timeoutIntervals.shift() || maxTimeout);
  } else {
    clearTimeout(idleTimer);
  }
});

function dismissScreensaver() {
  screensaverActive = false;
  const screensaver = $('#screensaver');
  if (screensaver) document.body.removeChild(screensaver);

  // Notify other tabs that screensaver was dismissed
  localStorage.setItem('screensaver-dismissed', Date.now());
}

function startScreensaver() {
  if (screensaverActive) return;

  screensaverActive = true;

  // create fullscreen wrapper
  const screensaver = document.createElement('div');
  screensaver.id = 'screensaver';
  screensaver.style.position = 'fixed';
  screensaver.style.top = '0';
  screensaver.style.left = '0';
  screensaver.style.width = '100%';
  screensaver.style.height = '100%';

  // fix the accessibility
  screensaver.tabindex = 0;
  screensaver.role = 'button';
  screensaver.ariaLabel = `Click or hit escape to return to the blog content. When the tab went out of focus, a stupid easter egg was triggered showing Remy's face in 1 bit art bouncing from edge to edge of the screen much like the iconic DVD logo from the 90s. I did consider triggering an audible "boop" each time my face hit the edge of the window, but I can imagine that would get quickly annoying - albeit this overlay is probably already quite annoying!`;

  document.body.appendChild(screensaver);

  screensaver.onclick = function () {
    dismissScreensaver();
  };

  // create bouncing DVD image
  const dvd = document.createElement('img');
  dvd.src = '/images/pixel-me.png';
  dvd.id = 'dvd';
  dvd.ariaHidden = true;
  dvd.style.position = 'absolute';
  dvd.style.width = '200px';
  dvd.style.height = '200px';
  dvd.style.willChange = 'transform, filter';
  screensaver.appendChild(dvd);

  let x = (window.innerWidth / 2).toFixed(0) - 100;
  let y = 20;
  let vx = 2;
  let vy = 2;
  dvd.style.transform = `translate3d(${x}px,${y}px,0)`;

  let hueIndex = 0;
  const hues = [0, 60, 120, 180, 240, 300];
  function recolour() {
    const hue = hues[hueIndex % hues.length];
    hueIndex++;
    dvd.style.filter = `hue-rotate(${hue}deg) saturate(100)`;
  }
  recolour();

  function animate() {
    x += vx;
    y += vy;
    let bounced = false;
    if (x <= 0 || x + 200 >= window.innerWidth) {
      vx = -vx;
      bounced = true;
    }
    if (y <= 0 || y + 200 >= window.innerHeight) {
      vy = -vy;
      bounced = true;
    }
    if (bounced) recolour();
    dvd.style.transform = `translate3d(${x}px,${y}px,0)`;
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

whenReady = {
  push(fn) {
    fn();
  },
};
