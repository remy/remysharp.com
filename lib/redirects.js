const abbrev = require('abbrev');

module.exports = collections => {
  let res = `/images/*  https://download-remysharp.netlify.com/:splat  200
  `;

  const blog = collections.blog;

  const map = blog.reduce((acc, post) => {
    const slug = post.slug;
    const parts = abbrev(slug);

    Object.keys(parts).forEach(word => {
      if (!acc.has(word)) acc.set(word, post.url);
    });

    return acc;
  }, new Map());

  for (let [key, value] of map) {
    res += `/${key} ${value} 302\n`;
  }

  console.log(res);

  return res;
};
