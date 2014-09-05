(function () {

  'use strict';
  var className = 'anchor';
  var idcache = {};
  var count = 0;

  function injectStyles() {
    var css = ['.anchor {',
      'height: 20px;',
      'width: 20px;',
      'display: block;',
      'padding-right: 6px;',
      'padding-left: 30px;',
      'margin-left: -30px;',
      'cursor: pointer;',
      'position: absolute;',
      'top: 0;',
      'left: 0;',
      'text-decoration: none;',
      'height: 100%;',
      'background: transparent;',
      'color: #3C4342;',
    '}',
    '',
    '.anchor:hover {',
     'color: #3C4342;',
    '}',
    'h1,h2,h3,h4,h5,h6 { position: relative; }',
    '',
    'h1:hover .anchor span:before,',
    'h2:hover .anchor span:before,',
    'h3:hover .anchor span:before,',
    'h4:hover .anchor span:before,',
    'h5:hover .anchor span:before,',
    'h6:hover .anchor span:before {',
      'content: "¶";',
      'position: absolute;',
      'left: 0px;',
      'top: 0;',
    '}'].join('').replace(/\.anchor/g, '.' + className);

    var style = document.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);
  }

  function permalink(){
    var $ = document.querySelectorAll.bind(document);

    var anchor = document.createElement('a');
    anchor.className = className;
    anchor.innerHTML = '<span></span>';

    [].forEach.call($('h1,h2,h3,h4,h5,h6'), function (el) {
      if (!el.id) {
        // let's make one
        var id = (el.textContent||el.innerText).replace(/&.*?;/g, '').replace(/\s+/g, '-').replace(/[^\w\-]/g, '').toLowerCase();
        if (idcache[id]) {
          id = id + '-' + count;
        }
        el.id = id;
        idcache[id] = 1;
      }

      var clone = anchor.cloneNode(true);
      clone.href = '#' + el.id;
      el.insertBefore(clone, el.firstChild);
      count = count + 1;
    });
  }

  if (document.querySelector && Function.prototype.bind) {
    injectStyles();
    permalink();
    if (window.location.hash && window.scrollY === 0) {
      // touching the location will cause the window to scroll
      window.location = window.location;
    }
  }
})();