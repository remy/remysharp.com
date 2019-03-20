const format = require('date-fns/format');

const byModified = (a, b) => (a.data.modified < b.data.modified ? 1 : -1);
const byDate = (a, b) => {
  return a.data.date < b.data.date ? 1 : -1;
};

module.exports = content => {
  // add rules here…
  const tags = new Set();
  content.sort((a, b) => {
    if (a.data.tags) a.data.tags.map(_ => tags.add(_));
    if (!a.data) {
      return -1;
    }
    return byDate(a, b);
  });

  const blog = content.filter(_ => _.inputPath.includes('blog/'));
  const collections = {
    all: content,
    blog,
    drafts: content
      .filter(_ => _.inputPath.includes('drafts/'))
      .slice(0)
      .sort(byModified),
    tags: [],
  };

  const recent = collections.blog
    .slice(0)
    .sort(byModified)
    .slice(0, 3);

  collections.recent = recent;
  [...tags].forEach(tag => {
    collections.tags[tag] = blog.filter(
      post => post.data.tags && post.data.tags.includes(tag)
    );
  });

  collections.latest = collections.recent[0];

  collections.years = collections.blog
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
    const index = collections.blog.findIndex(post => post.slug === slug);

    if (index === -1) {
      return [null, null];
    }

    if (index === 0) {
      return [collections.blog[index + 1], null];
    }

    return [collections.blog[index + 1], collections.blog[index - 1]];
  };

  return collections;
};
