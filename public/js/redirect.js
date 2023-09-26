/* eslint-env browser */

document.body.addEventListener(
  'click',
  (event) => {
    /** @type HTMLElement */
    let target = event.target;
    if (target.nodeName !== 'A') {
      // check we're not inside a link
      target = target.closest('a');
    }

    if (target.nodeName === 'A') {
      /** @type String */
      let href = '';

      try {
        href = encodeURIComponent(target.attributes.href.value);
      } catch (_) {
        // a link without an href, let's bail
        return;
      }

      if (!href.startsWith('http')) {
        // ignore it
        return;
      }

      let date = '';

      if (location.pathname.startsWith('/2')) {
        date = location.pathname.substr(1, 10).replace(/\//g, '-');
        target.href = `/redirect?url=${href}&date=${date}`;
      } else {
        target.href = `/redirect?url=${href}`;
      }
    }
  },
  true
);
