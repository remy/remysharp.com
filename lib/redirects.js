module.exports = collections => {
  let res = `/images/*  https://download-remysharp.netlify.com/:splat  200
  `;

  const blogs = collections.blog.slice(0, 3);

  res += blogs
    .reduce((acc, post) => {
      const slug = post.slug;
      const parts = slug.split('-');
      acc.push(`/${parts[0]} ${post.url} 302`);
      return acc;
    }, [])
    .join('\n');

  return res;
};
