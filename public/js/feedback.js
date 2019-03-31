/* eslint-env browser */
(() => {
  const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s)); // NodeList with map, forEach, etc
  const $ = (s, ctx = document) => {
    if (s.indexOf('<') === -1) {
      return ctx.querySelector(s);
    }

    const div = document.createElement('div');
    div.innerHTML = s;
    return div.firstChild;
  };

  if (location.search === '?thanks') {
    $('main article').innerHTML =
      '<h1 class="title">Thanks for the feedback!</h1><div class="post-content"><p>You will now be redirected to my website.</div>';

    setTimeout(() => {
      window.location.href = '/';
    }, 3000);
  }

  // Form validation
  const form = $('#feedback-form form');
  // FIXME doesn't apply to all - only first.
  $('button[type="submit"]').onclick = () => {
    $$('[required]', form).map(el => el.classList.add('required'));
  };

  const params = new URL(location.href).searchParams;

  if (params.has('product')) {
    const title = `Feedback for ${params.get('product')}`;
    $('h1').innerText = title;
    document.title = title;
  }

  // Include all the existing search params
  for (const [key, value] of params) {
    if (key === 'name') {
      $('[name="name"]', form).value = value;
      continue;
    }

    if (key === 'email') {
      $('[name="email"]', form).value = value;
      continue;
    }

    if (key === 'messageField') {
      const ta = $('[name="message"]', form);
      ta.value = value;
      ta.setSelectionRange(0, 0);
      continue;
    }

    if (key === 'extraInfo') {
      const ta = $(
        `<textarea style="display:none" readonly name="${key}"></textarea>`
      );
      ta.value = value;
      form.append(ta);
      continue;
    }

    const input = $(`<input type="hidden" name="${key}">`);
    input.value = value;
    form.append(input);
  }

  form.onsubmit = () => {
    const product = params.has('product') ? ': ' + params.get('product') : '';
    const message = $('[name="message"]', form).value.slice(0, 100);
    const replyTo = $('<input type="hidden" name="_replyto">');
    replyTo.value = $('#form_email').value;
    const subjectEl = $(
      `<input type="hidden" name="_subject" value="Feedback${product.replace(
        /"/g,
        '\\"'
      )} - ${message.replace(/"/g, '\\"')}">`
    );
    form.prepend(replyTo);
    form.prepend(subjectEl);
  };
})();
