module.exports = async collections => {
  const res = [
    ...collections.blog
      .filter(post => post.data.date.toString().slice(0, 4) >= '2018')
      .map(post => `/draft/${post.slug} ${post.url} 301`),
    '/cli-book https://abookapart.com/products/working-the-command-line 301',
    '/talks /speaking/ 301',
    '/feed/ /feed.xml 301',
    '/2016/03/22/the-copy--paste-guide-to-your-first-service-worker /2016/03/22/the-copy-paste-guide-to-your-first-service-worker 301',
    `/images/* https://download-remysharp.netlify.com/:splat 200`,
    `/_logs/* https://remysharp-logs.netlify.com/:splat 200`,
    `/downloads/* https://download-remysharp.netlify.com/:splat 200`,
    `/latest ${collections.blog[0].url} 302`, // important, this is temp redirect
  ];

  res.push('/*/amp /:splat');
  res.push('/* /404.html 404');

  return res.join('\n');
};
