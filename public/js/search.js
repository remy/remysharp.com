var $results = $('#search-results');
var $for = $('#for');
var template = $('#result-template').html();

// 6 months ago
var recently = new Date(Date.now() - 1000 * 60 * 60 * 24 * 84)
  .toJSON()
  .replace(/Z/, '')
  .replace(/\..*$/, '');

function clean(s) {
  return decodeURIComponent(s).replace(/[<>]/g, function(s) {
    return {
      '<': '&lt;',
      '>': '&gt;',
    };
  });
}

function search() {
  var val = $for.val();
  find(encodeURIComponent(val), val);
}

$('form.search').on('submit', function(event) {
  event.preventDefault();
  search();
});

$for.on('input', search);

if (window.location.search) {
  var q = window.location.search
    .substr(1)
    .split('=')
    .pop();
  $for.val(clean(q));
  find(q);
}

function find(queryString, query) {
  $results.html('<li>Searching...</li>');

  window.history.replaceState(null, query, '/search.html?q=' + queryString);

  const re = new RegExp(query, 'ig');
  const res = window.searchData
    .map(post => {
      let count = (post.text.match(re) || []).length;

      if (count < 5) {
        // count = 1;
      } else {
        count += 25;
      }

      if (post.title.toLowerCase().includes(query)) {
        count += 100;
      }

      if (count) {
        if (post.data < recently) {
          count += 1000;
        }
        return { count, ...post };
      }
      return false;
    })
    .filter(Boolean);

  if (res.length === 0) {
    $results.html('No results found for "' + $for.val() + '"');
    return;
  }
  var html = (!query ? window.searchData : res)
    .sort((a, b) => {
      if (a.count === b.count) {
        return a.date > b.date ? -1 : 1;
      }
      return a.count < b.count ? 1 : -1;
    })
    .slice(0, 10)
    .map(res => interpolate(template, res))
    .join('');
  $results.html(html);
}

// note: exporter is the object constructor, not an instance
function interpolate(string, values) {
  if (!values) {
    values = {};
  }

  return (string || '').replace(/({{.*?}})/g, function(all, match) {
    var key = match.slice(2, -2); // ditch the wrappers
    var parts = key.split('|').map(trim);
    // exit function with interpolate string through functions
    return parts.reduce(function(prev, curr) {
      var value = pluck(curr, values);
      if (value) {
        prev = value;
      } else if (typeof interpolate[curr] === 'function') {
        prev = interpolate[curr](prev);
      }
      return prev;
    }, '');
  });
}

function pluck(path, values) {
  path = path.split('.');
  return path.reduce(function(prev, curr) {
    if (prev && prev[curr]) {
      return prev[curr];
    }
    return undefined;
  }, values);
}

function trim(s) {
  return s.trim();
}
