/* eslint-env browser */
if (globalThis.fetch) {
  const root = 'https://unrot.link';

  // check if unrot.link is up using the ping service. It'll return a 206 (empty)
  // if it's up, or throw if it's down. The /ping endpoint is also cached for 1
  // day against the CDN
  fetch(root + '/ping', {
    method: 'HEAD',
    mode: 'cors',
  })
    .then((res) => {
      if (res.status === 204) {
        document.body.addEventListener(
          'click',
          (event) => {
            // use event delegation to only listen on clicks on links, then
            // filter out relative links and archive.org links so we're
            // targeting external links then, if we have an h-entry, try to also
            // use the published date.

            /** @type HTMLElement */
            const target = event.target.closest('a[href]');

            if (target) {
              /** @type String */
              let href = target.attributes.href.value;

              if (!href.startsWith('http')) {
                // ignore relative urls
                return;
              }

              if (href.includes('archive.org')) {
                // don't try to redirect archive links
                return;
              }

              href = encodeURIComponent(href);

              // default to unrot.link with the url
              target.href = root + `/?url=${href}`;

              // now check if we have an h-entry, and if we do, try to use the
              // published date
              const hEntry = target.closest('.h-entry');

              // if we have an h-entry with a published date, use that
              if (hEntry) {
                const date = hEntry.querySelector('.dt-published[datetime]');
                if (date) {
                  target.href += `&date=${date.dateTime}`;
                }
              }
            }
          },
          {
            passive: true,
          }
        );
      } else if (res.status === 402) {
        console.log(
          "unrot.link does not have your site in the allow list. Please visit https://unrot.link/access/ to request access (it's free)."
        );
      } else {
        console.log(
          'unrot.link is not responding correctly - possibly remove this script'
        );
      }
    })
    .catch((_) => {
      console.log('unrot.link is unreachable - possibly remove this script');
    });
}
