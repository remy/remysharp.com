/* eslint-env browser, jquery */
($ => {
  if (location.search === '?thanks') {
    $('main article').html(
      '<h1 class="title">Thanks for the feedback!</h1><div class="post-content"><p>You will now be redirected to my website.</div>'
    );

    setTimeout(() => {
      window.location.href = '/';
    }, 3000);
  }

  // Form validation
  const form = $('#feedback-form');
  $('button[type="submit"]').on('click', () =>
    form.find('[required]').addClass('required')
  );

  const params = new URL(location.href).searchParams;

  if (params.has('product')) {
    const title = `Feedback for ${params.get('product')}`;
    $('h1').text(title);
    document.title = title;
  }

  // Include all the existing search params
  for (const [key, value] of params) {
    if (key === 'name') {
      form.find('[name="name"]').val(value);
      continue;
    }

    if (key === 'email') {
      form.find('[name="email"]').val(value);
      continue;
    }

    if (key === 'messageField') {
      form
        .find('[name="message"]')
        .val(value)
        .get(0)
        .setSelectionRange(0, 0);
      continue;
    }

    if (key === 'extraInfo') {
      form.append(
        $(
          `<textarea style="display:none" readonly name="${key}"></textarea>`
        ).text(value)
      );
      continue;
    }

    form.append($(`<input type="hidden" name="${key}">`).val(value));
  }

  form.on('submit', e => {
    const product = params.has('product') ? ': ' + params.get('product') : '';
    const message = form
      .find('[name="message"]')
      .val()
      .slice(0, 100);
    const subject = 'Feedback' + product + ' - ' + message;
    form.append(
      $('<input type="hidden" name="_replyto">').val($('#form_email').val())
    );
    if (params.has('ref')) {
      form.append($(`<input type="hidden" name="ref">`).val(params.get('ref')));
    }
    form.append($(`<input type="hidden" name="_subject">`).val(subject));
  });
})(jQuery);
