require('@remy/envy');
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const MarkdownIt = require('markdown-it');
const TurndownService = require('turndown');
const { writeFile, readdir } = require('fs').promises;
const hash = require('buffer-crc32');
const td = new TurndownService();
const md = new MarkdownIt({
  linkify: true,
});

const user = 'rem';
const root = __dirname + '/../public/links/';
let cookie = '';

const turndown = (s) => td.turndown(s).replace(/\\([->_*])/g, '$1');

async function login() {
  const res = await fetch('https://pinboard.in/auth/', {
    method: 'post',
    redirect: 'manual',
    body: `username=${user}&password=${process.env.PINBOARD_TOKEN}`,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'User-Agent':
        'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)',
    },
  });

  const raw = res.headers.raw();
  cookie = raw['set-cookie'].map((s) => s.split(';')[0].trim()).join('; ');
}

async function links(written) {
  const res = await fetch(`https://pinboard.in/u:${user}/t:webdev/`, {
    headers: {
      cookie,
    },
  });
  const html = await res.text();
  const $ = cheerio.load(html);

  const items = $('.bookmark')
    .map((i, el) => {
      const $el = $(el);
      const isPrivate = $el.hasClass('private');
      const pId = $el.attr('id');
      const $title = $el.find('a.bookmark_title');
      const title = $title.text().trim();
      const url = $title.attr('href');

      const pubDate = new Date(
        $el
          .find('.when')
          .attr('title')
          .replace('&nbsp;', '')
          .trim()
          .replace(/\./g, '-')
          .replace(/\s+/g, ' ')
      );

      const filename = `${pubDate.toJSON().split('T')[0]}-${hash(url).toString(
        'hex'
      )}`;

      if (written.includes(filename + '.md')) {
        return null;
      }

      let description = $el.find('.description').html();
      if (description === null) {
        description = '';
      }

      if (description.includes('<blockquote>')) {
        if (!description.includes(url)) {
          description += '\n\n<p>' + url + '</p>';
        }
        description = turndown(description);
      } else if (!description.includes(url)) {
        description += '\n\n' + url;
      }

      description = turndown(
        md.render(
          description
            .replace(/<\/?[^>]+(>|$)/g, '')
            .replace(/&gt;/g, '>')
            .replace(url, `_Source: [${new URL(url).hostname}](<${url}>)_`)
        )
      ).trim();

      const tags = $el
        .find('.tag')
        .map((i, el) => {
          return $(el).text();
        })
        .get()
        .map((_) => _.trim());

      if (tags.includes('-web')) {
        // ignore this link for web bundle
        return null;
      }

      return {
        filename,
        title,
        url,
        description,
        tags,
        pubDate,
        pId,
        isPrivate,
      };
    })
    .get();

  return items.filter(Boolean).sort((a, b) => {
    return a.pubDate.toJSON() < b.pubDate.toJSON() ? 1 : -1;
  });
}

function safe(text) {
  const entities = { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '\\"' };
  return text.replace(/[<>&]/g, (m) => entities[m]);
}

function toFile(
  { isPrivate, pId, title, url, description, pubDate, tags, filename },
  written
) {
  if (written.includes(filename)) {
    console.log('skip');
    return;
  }

  const body = `---
title: "${title.replace(/"/g, '\\"')}"
date: ${pubDate.toJSON()}
url: ${url}
slug: ${filename}
pinboardId: ${pId}
private: ${isPrivate}
tags:
${tags.map((tag) => '  - ' + tag).join('\n')}
---

# ${safe(title)}

${description}
`;

  console.log('+ ' + filename);
  return writeFile(root + filename + '.md', body, 'utf8').catch((e) => e);
}

async function main() {
  const written = await readdir(root);
  await login();
  const items = await links(written);

  await Promise.all(items.map((item) => toFile(item, written)));
}

module.exports = main;

if (!module.parent) {
  main().catch((e) => {
    console.log(e);
  });
}
