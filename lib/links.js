require('@remy/envy');
const MarkdownIt = require('markdown-it');
const TurndownService = require('turndown');
const { writeFile, readdir, readFile } = require('fs').promises;
const hash = require('buffer-crc32');
const td = new TurndownService();
const md = new MarkdownIt({
  linkify: true,
});

const apiUrl = 'https://links.the-sharps.com/api/bookmarks/?limit=10&added_since=2026-06-10&bundle=1';
const root = __dirname + '/../public/links/';

const turndown = (s) => td.turndown(s).replace(/\\([->_*])/g, '$1');

function sourceLine(url) {
  try {
    return `_Source: [${new URL(url).hostname}](<${url}>)_`;
  } catch {
    return `_Source: ${url}_`;
  }
}

function markdownDescription(description, url) {
  let text = (description || '').toString().trim();
  const source = sourceLine(url);
  if (!text) {
    return source;
  }

  if (!text.includes(url) && !text.includes('_Source:')) {
    text += `\n\n${source}`;
  }

  return text;
}

function getDate(bookmark) {
  const value =
    bookmark.date_added ||
    bookmark.created ||
    bookmark.created_at ||
    bookmark.date ||
    bookmark.date_modified ||
    bookmark.modified;
  const date = value ? new Date(value) : new Date();
  return Number.isNaN(date.valueOf()) ? new Date() : date;
}

function getTags(bookmark) {
  const source = bookmark.tag_names || bookmark.tags || [];

  if (Array.isArray(source)) {
    return source.map((tag) => String(tag).trim()).filter(Boolean);
  }

  if (typeof source === 'string') {
    return source
      .split(/[\s,]+/)
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  return [];
}

async function existingUrls(written) {
  const urls = new Set();
  const files = written.filter((name) => name.endsWith('.md'));

  await Promise.all(
    files.map(async (name) => {
      try {
        const body = await readFile(root + name, 'utf8');
        const match = body.match(/^url:\s*(.+)$/m);
        if (match && match[1]) {
          urls.add(match[1].trim());
        }
      } catch {
        // Ignore unreadable files while building dedupe set.
      }
    })
  );

  return urls;
}

async function links(written, urlsWritten) {
  const token = process.env.LINKDING_TOKEN;
  if (!token) {
    return;
    // throw new Error('Missing LINKDING_TOKEN in environment');
  }

  const bookmarks = [];
  let nextUrl = apiUrl;

  while (nextUrl) {
    const res = await fetch(nextUrl, {
      method: 'GET',
      headers: {
        authorization: `Token ${token}`,
      },
    });

    if (!res.ok) {
      const detail = await res.text();
      throw new Error(`Bookmark API failed (${res.status}): ${detail}`);
    }

    const data = await res.json();
    const pageBookmarks = Array.isArray(data)
      ? data
      : data.results || data.bookmarks || [];

    if (!Array.isArray(pageBookmarks)) {
      throw new Error('Unexpected bookmark API payload');
    }

    bookmarks.push(...pageBookmarks);

    if (!Array.isArray(data) && data.next) {
      nextUrl = data.next.startsWith('http')
        ? data.next
        : new URL(data.next, apiUrl).toString();
    } else {
      nextUrl = null;
    }
  }

  const items = bookmarks
    .map((bookmark) => {
      const url = (bookmark.url || bookmark.href || '').trim();
      if (!url) {
        return null;
      }

      const pubDate = getDate(bookmark);
      const filename = `${pubDate.toJSON().split('T')[0]}-${hash(url).toString(
        'hex'
      )}`;

      if (written.includes(filename + '.md')) {
        return null;
      }

      if (urlsWritten.has(url)) {
        return null;
      }

      const title =
        (bookmark.title || bookmark.website_title || bookmark.name || url)
          .toString()
          .trim();
      const description = markdownDescription(
        bookmark.description || bookmark.notes || '',
        url
      );
      const tags = getTags(bookmark);
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
        bookmarkId: bookmark.id,
      };
    })
    .filter(Boolean);

  return items.filter(Boolean).sort((a, b) => {
    return a.pubDate.toJSON() < b.pubDate.toJSON() ? 1 : -1;
  });
}

function safe(text) {
  const entities = { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '\\"' };
  return text.replace(/[<>&"]/g, (m) => entities[m]);
}

function toFile(
  { isPrivate, bookmarkId, title, url, description, pubDate, tags, filename },
  written
) {
  if (written.includes(filename + '.md')) {
    console.log('skip');
    return;
  }

  const body = `---
title: "${title.replace(/"/g, '\\"')}"
date: ${pubDate.toJSON()}
url: ${url}
slug: ${filename}
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
  const urlsWritten = await existingUrls(written);
  const items = await links(written, urlsWritten);

  await Promise.all(items.map((item) => toFile(item, written)));
}

module.exports = main;

if (!module.parent) {
  main().catch((e) => {
    console.log(e);
  });
}
