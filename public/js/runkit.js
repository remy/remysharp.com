function shouldInject(el) {
  if (el.nextSibling.nodeName === '#comment') {
    if (el.nextSibling.nodeValue === 'live') {
      return true;
    }
  }

  if (el.nextSibling.nodeName === '#text') {
    return shouldInject(el.nextSibling);
  }

  return false;
}

Array.from(document.querySelectorAll('pre')).forEach(el => {
  var live = shouldInject(el);

  if (!live) return;

  const id = 'live' + ((Math.random() * 1e6) | 0);

  const div = document.createElement('div');
  el.parentNode.insertBefore(div, el);
  div.appendChild(el);

  div.id = id;

  RunKit.createNotebook({
    element: div,
    // preamble: 'var unpack = require(\"@remy/unpack\");\n\n',
    source: el.innerText,
  });
});
