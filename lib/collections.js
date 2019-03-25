const format = require('date-fns/format');
const twitter = require('./twitter');

const byModified = (a, b) => (a.data.modified < b.data.modified ? 1 : -1);
const byDate = (a, b) => {
  return a.data.date < b.data.date ? 1 : -1;
};

module.exports = async content => {
  const blog = content.filter(_ => _.inputPath.includes('blog/')).sort(byDate);

  const tags = new Set();
  blog.forEach(post => {
    if (post.data.tags) {
      post.data.tags.map(_ => tags.add(_));
    }
  });

  const drafts = content
    .filter(_ => _.inputPath.includes('drafts/'))
    .slice(0)
    .sort(byModified);

  const collections = {
    all: content,
    blog,
    drafts,
    tags: [],
  };

  collections.recent = blog
    .slice(0)
    .sort(byModified)
    .slice(0, 3);

  [...tags].forEach(tag => {
    collections.tags[tag] = blog.filter(
      post => post.data.tags && post.data.tags.includes(tag)
    );
  });

  collections.latest = collections.recent[0];

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

  return collections;
};
