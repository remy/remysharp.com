var $results = $('#search-results');
var $for = $('#for');
var template = $('#result-template').html();

function clean(s) {
  return decodeURIComponent(s).replace(/[<>]/g, function (s) {
    return {
      '<': '&lt;',
      '>': '&gt;',
    };
  });
}

$('form.search').on('submit', function (event) {
  event.preventDefault();
  var val = $(this).find('input[type="text"]').val();
  $for.val(val);
  find(encodeURIComponent(val));
});

if (window.location.search) {
  var q = window.location.search.substr(1).split('=').pop()
  $for.val(clean(q));
  find(q);
}

function find(query) {
  $results.html('<li>Searching...</li>');

  window.history.pushState(null, query, '/search?q=' + query);

  fetch('/search?q=' + query, {
    cors: true,
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
  }).then(function (res) {
    if (res.status >= 400) {
      throw new Error('Bad response from server: ' + res.status);
    }

    return res.json();
  }).catch(function (error) {
    return [];
  }).then(function (data) {
    if (data.length === 0) {
      throw new Error('No results found for "' + $for.val()  + '"');
    }
    return data;
  }).then(function (data) {
    var html = data.map(function (res) {
      return interpolate(template, res);
    }).join('');
    $results.html(html);
  }).catch(function (error) {
    $results.html('<li>' + error.message + '</li>');
  });
}

// note: exporter is the object constructor, not an instance
function interpolate(string, values) {
  if (!values) {
    values = {};
  }

  return (string || '').replace(/({{.*?}})/g, function (all, match) {
    var key = match.slice(2, -2); // ditch the wrappers
    var parts = key.split('|').map(trim);
    // exit function with interpolate string through functions
    return parts.reduce(function (prev, curr) {
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
  return path.reduce(function (prev, curr) {
    if (prev && prev[curr]) {
      return prev[curr];
    }
    return undefined;
  }, values);
}

function trim(s) {
  return s.trim();
}