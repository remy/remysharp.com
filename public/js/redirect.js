/* eslint-env browser */

document.body.addEventListener(
  'click',
  (event) => {
    if (event.target.nodeName === 'A') {
      /** @type String */
      const href = event.target.attributes.href;

      if (!href.startsWith('http')) {
        // ignore it
        return;
      }

      let date = '';

      if (location.pathname.startsWith('/2')) {
        date = location.pathname.substr(1, 10).replace(/\//g, '-');
        event.target.href = `/redirect?url=${href}&date=${date}`;
      } else {
        event.target.href = `/redirect?url=${href}`;
      }
    }
  },
  true
);
