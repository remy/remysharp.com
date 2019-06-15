/* eslint-env browser */
/* global jq: true */

function ready() {
  const $ = s => document.getElementById(s.substr(1));
  const code = Array.from(document.querySelectorAll('.language-jq'))
    .filter(_ => _.dataset.source)
    .map(_ => {
      const query = _.textContent;

      let source = [];

      if (_.dataset.source.indexOf('#') === 0) {
        source = JSON.parse($(_.dataset.source).textContent);
      } else {
        source = JSON.parse(_.dataset.source);
      }

      const button = document.createElement('button');
      button.innerHTML = '<img src="/images/run.svg">';
      button.className = 'micro-button';
      button.onclick = () => {
        jq.promised
          .json(source, query)
          .then(res => JSON.stringify(res, 0, 2))
          .then(res => console.log(res))
          .catch(E => console.log(E));
      };

      _.append(button);

      return {
        source,
        query,
        element: _,
      };
    });
}

async function main() {
  var script = document.createElement('script');
  script.src = '/js/vendor/jq.wasm.js';
  document.head.appendChild(script);
  script.onload = () => {
    jq.onInitialized.addListener(ready);
  };
}

main();
