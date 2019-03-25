const abbrev = require('abbrev');
const { resolve } = require('path');
const { cwd, output } = require('./globals');
const { glob } = require('./glob');

module.exports = async collections => {
  const files = '';
  // (await glob(`${(resolve(cwd), output)}/**/*.html`))
  //   .map(
  //     _ =>
  //       `${_.replace(output, '').replace(/\.html$/, '')} ${_.replace(
  //         output,
  //         ''
  //       )} 200`
  //   )
  //   .join('\n');

  const res = [
    `${files}\n/images/* https://download-remysharp.netlify.com/:splat 200`,
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
