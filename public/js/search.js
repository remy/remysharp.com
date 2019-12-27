/* eslint-env browser */

(() => {
  const $ = (s, context = document) => context.querySelector(s);

  var $results = $('#search-results');
  var $for = $('#for');
  var template = $('#result-template').innerHTML;

  var months = [
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

  function clean(s) {
    return decodeURIComponent(s).replace(/[<>]/g, () => {
      return {
        '<': '&lt;',
        '>': '&gt;',
      };
    });
  }

  function search() {
    var val = $for.value.trim();
    find(encodeURIComponent(val), val);
  }

  $('#primary-search').onsubmit = function(event) {
    event.preventDefault();
    search();
  };

  $for.oninput = search;

  if (window.location.search) {
    var q = window.location.search
      .substr(1)
      .split('=')
      .pop();
    if (window.location.search.indexOf('?s=') === 0) {
      // browser search, replace pluses
      $for.value = clean(q.replace(/\+/g, ' '));
      search();
    } else {
      $for.value = clean(q);
      search();
    }
  }

  function find(queryString, query) {
    $results.innerHTML = '<li>Searching...</li>';

    console.log({ query, queryString });

    window.history.replaceState(null, query, '/search?q=' + queryString);

    var titleOnly = false;

    if (query.startsWith('title:')) {
      titleOnly = true;
      query = query.replace(/^title:\s?/, '');

      if (!query.trim()) {
        return;
      }
    }

    const re = new RegExp(query.replace(/\s+/g, '|'), 'ig');
    query = query.split(/\s+/);

    const res = window.searchData
      .map(post => {
        if (query[0] === '') {
          return post;
        }
        let count = 0;

        if (!titleOnly) {
          const matches = post.text.match(re) || [];

          matches.forEach(m => (count += m.length < 5 ? 1 : m.length));

          const urlMatches =
            post.url
              .split('/')
              .pop()
              .match(re) || [];

          urlMatches.forEach(m => (count += 100 * m.length));

          const titleMatches = post.title.toLowerCase().match(re) || [];

          titleMatches.forEach(m => (count += 100 * m.length));
        } else {
          const titleMatches = post.title
            .toLowerCase()
            .includes(query.join(' ').toLowerCase());

          if (titleMatches) {
            count += 100 * query.join(' ').length;
          }
        }

        if (count) {
          if (count > 100) {
            const d = new Date(post.date).getTime();
            const yearsAgo = (Date.now() - d) / 1000 / 60 / 60 / 24 / 365;
            count += 100 / yearsAgo;
          }
          return { count, ...post };
        }
        return false;
      })
      .filter(Boolean);

    if (res.length === 0) {
      $results.innerHTML = 'No results found for "' + $for.value + '"';
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
      .map(res => {
        const d = new Date(res.date);
        res.niceDate = `${d.getDate()}-${
          months[d.getMonth()]
        } ${d.getFullYear()}`;
        return res;
      })
      .map(res => interpolate(template, res))
      .join('');
    $results.innerHTML = html;
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
})();
