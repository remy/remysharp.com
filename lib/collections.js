/* eslint-disable require-atomic-updates */
const format = require('date-fns/format');
const twitter = require('./twitter');
const squash = require('./squash');
const stats = require('./stats');
const getLikes = require('./likes');
const isDraft = require('./is-draft');

const sortBy = (field) => (a, b) => (a.data[field] < b.data[field] ? 1 : -1);

function unSlug(s) {
  return s
    .toLowerCase()
    .split('-')
    .map((i) => i[0].toUpperCase() + i.substr(1))
    .join(' ');
}

module.exports = async (content) => {
  const blog = content
    .filter((_) => _.inputPath.includes('blog/'))
    .filter((_) => !isDraft(_))
    .sort(sortBy('date'));

  const links = content
    .filter((_) => _.inputPath.includes('links/'))
    .sort(sortBy('date'));

  const devlog = content
    .filter((_) => _.inputPath.includes('devlog/'))
    .map((post) => {
      const parts = post.url.split('/');
      post.data.date = post.data.modified = post.date = new Date(parts.pop());

      post.data.project = unSlug(parts.pop());
      post.title = format(post.date, 'D-MMM YYYY');
      return post;
    })
    .sort((a, b) => {
      if (a.data.project === b.data.project) {
        return a.data.date < b.data.date ? 1 : -1;
      } else if (a.data.project < b.data.project) {
        return -1;
      }
      return 1;
    });

  const newsletters = content
    .filter((_) => _.inputPath.includes('newsletters/'))
    .map((post) => {
      if (!post.data.date) {
        post.data.modified = post.data.date = new Date(post.slug);
      }

      const slug = format(post.data.date, 'YYYY-MM');
      post.slug = slug;

      return post;
    })
    .sort(sortBy('date'));

  const likes = await getLikes();

  // collect tags and add stats from Google Analytics
  const tags = new Set();
  blog.forEach((post) => {
    if (post.data.tags) {
      post.data.tags.map((_) => tags.add(_));
    }

    if (likes[post.slug]) {
      post.data.likes = likes[post.slug].length;
      // console.log({ slug: post.slug }, likes[post.slug]);
      let images = likes[post.slug]
        .map(
          (_) =>
            `<a class="reset" href="${_.author.url}"><img width="32" title="${_.author.name}" height="32" onerror="this.src='/images/no-user.svg'" src="/images/no-user.svg" data-src="${_.author.photo}" alt="${_.author.name}"></a>`
        )
        .join('');

      post.data.likeImages = images;
    }

    if (stats.all[post.slug]) {
      post.data.views = stats.all[post.slug].views;
    }
  });

  const drafts = Array.from(
    content.filter((_) => {
      _.data.draft = isDraft(_) || _.inputPath.includes('drafts/');
      return _.data.draft;
    })
  ).sort(sortBy('modified'));

  const collections = {
    all: content,
    newsletters,
    blog,
    links,
    devlog,
    drafts,
    tags: [],
  };

  collections.popular = blog
    .filter(({ slug }) => stats.all[slug])
    .map((post) => {
      const { views, index, age } = stats.all[post.slug];
      const data = { ...post.data, views, index, age };
      return { ...post, data };
    })
    .sort((a, b) => (a.data.index < b.data.index ? 1 : -1));

  collections.recent = blog.slice(0).sort(sortBy('modified')).slice(0, 3);

  [...tags].forEach((tag) => {
    collections.tags[tag] = blog.filter(
      (post) => post.data.tags && post.data.tags.includes(tag)
    );
  });

  collections.latest = collections.blog[0];

  collections.years = blog
    .filter((post) => post.data.date)
    .reduce((acc, post) => {
      const year = format(post.data.date, 'YYYY');
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(post);
      return acc;
    }, {});

  collections.nextPrev = (slug) => {
    const index = blog.findIndex((post) => post.slug === slug);

    if (index === -1) {
      return [null, null];
    }

    if (index === 0) {
      return [blog[index + 1], null];
    }

    return [blog[index + 1], blog[index - 1]];
  };

  collections.twitter = await twitter();

  collections.squash = squash;

  return collections;
};
