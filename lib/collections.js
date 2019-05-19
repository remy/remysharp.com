const format = require('date-fns/format');
const twitter = require('./twitter');
const squash = require('./squash');
const stats = require('./stats');

const byModified = (a, b) => (a.data.modified < b.data.modified ? 1 : -1);
const byDate = (a, b) => {
  return a.data.date < b.data.date ? 1 : -1;
};

module.exports = async content => {
  const blog = content.filter(_ => _.inputPath.includes('blog/')).sort(byDate);

  // collect tags and add stats from Google Analyics
  const tags = new Set();
  blog.forEach(post => {
    if (post.data.tags) {
      post.data.tags.map(_ => tags.add(_));
    }

    if (stats.all[post.slug]) {
      post.data.views = stats.all[post.slug].views;
    }
  });

  const drafts = Array.from(
    content.filter(_ => _.inputPath.includes('drafts/'))
  ).sort(byModified);

  const collections = {
    all: content,
    blog,
    drafts,
    tags: [],
  };

  collections.popular = blog
    .filter(({ slug }) => stats.all[slug])
    .map(post => {
      const { views, index, age } = stats.all[post.slug];
      const data = { ...post.data, views, index, age };
      return { ...post, data };
    })
    .sort((a, b) => (a.data.index < b.data.index ? 1 : -1));

  collections.recent = blog
    .slice(0)
    .sort(byModified)
    .slice(0, 3);

  [...tags].forEach(tag => {
    collections.tags[tag] = blog.filter(
      post => post.data.tags && post.data.tags.includes(tag)
    );
  });

  collections.latest = collections.blog[0];

  collections.years = blog
    .filter(post => post.data.date)
    .reduce((acc, post) => {
      const year = format(post.data.date, 'YYYY');
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(post);
      return acc;
    }, {});

  collections.nextPrev = slug => {
    const index = blog.findIndex(post => post.slug === slug);

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
