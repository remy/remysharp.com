const abbrev = require('abbrev');

module.exports = collections => {
  let res = `/images/*  https://download-remysharp.netlify.com/:splat  200
  /downloads/*  https://download-remysharp.netlify.com/:splat  200`;

  const blog = collections.blog;

  const map = blog.reduce((acc, post) => {
    console.log(post.data.date);

    const slug = post.slug;
    const parts = slug.split('-');

    parts.forEach(word => {
      if (!acc.has(word)) acc.set(word, post.url);
    });

    Object.keys(abbrev(parts[0])).forEach(word => {
      if (!acc.has(word)) acc.set(word, post.url);
    });

    Object.keys(abbrev(slug)).forEach(word => {
      if (!acc.has(word)) acc.set(word, post.url);
    });

    // full slug names win though
    acc.set(slug, post.url);

    return acc;
  }, new Map());

  for (let [key, value] of map) {
    res += `/${key} ${value} 302\n`;
  }

  res += `/* /404.html 404\n`;

  // console.log(res);

  return res;
};
