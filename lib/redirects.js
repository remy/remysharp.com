module.exports = async collections => {
  const res = [
    ...collections.blog
      .filter(post => post.data.date.slice(0, 4) >= '2018')
      .map(post => `/draft/${post.slug} ${post.url} 302`),
    '/2016/03/22/the-copy--paste-guide-to-your-first-service-worker /2016/03/22/the-copy-paste-guide-to-your-first-service-worker 301',
    `/images/* https://download-remysharp.netlify.com/:splat 200`,
    `/downloads/* https://download-remysharp.netlify.com/:splat 200`,
    `/latest ${collections.blog[0].url} 302`,
  ];

  // const blog = collections.blog;
  // const map = blog.reduce((acc, post) => {
  //   const slug = post.slug;
  //   const parts = slug.split('-');

  //   parts.forEach(word => {
  //     if (!acc.has(word)) acc.set(word, post.url);
  //   });

  //   Object.keys(abbrev(parts[0])).forEach(word => {
  //     if (!acc.has(word)) acc.set(word, post.url);
  //   });

  //   Object.keys(abbrev(slug)).forEach(word => {
  //     if (!acc.has(word)) acc.set(word, post.url);
  //   });

  //   // full slug names win though
  //   acc.set(slug, post.url);

  //   return acc;
  // }, new Map());

  // for (let [key, value] of map) {
  //   res += `/${key} ${value}/ 302\n`;
  // }

  res.push('/* /404.html 404');

  return res.join('\n');
};
