/* eslint-env browser */
document.body.addEventListener(
  'click',
  (event) => {
    /** @type HTMLElement */
    let target = event.target.closest('a[href]');

    if (target && target.nodeName === 'A') {
      /** @type String */
      let href = target.attributes.href.value;

      if (!href.startsWith('http')) {
        // ignore it
        return;
      }

      if (href.includes('archive.org')) {
        // don't try to redirect archive links
        return;
      }

      href = encodeURIComponent(href);

      const hEntry = target.closest('.h-entry');
      const date = hEntry.querySelector('.dt-published[datetime]');

      if (date) {
        target.href = `https://unrot.link/?url=${href}&date=${date.dateTime}`;
      } else {
        target.href = `https://unrot.link/?url=${href}`;
      }
    }
  },
  true
);
