module.exports = async collections => {
  const res = [
    // fixes
    ...collections.blog
      .filter(post => post.data.date.toString().slice(0, 4) >= '2018')
      .map(post => `/drafts/${post.slug} ${post.url} 301`),
    '/cli-book https://abookapart.com/products/working-the-command-line 301',
    '/talks /speaking/ 301',
    '/subscribe /newsletters/ 301',
    '/feed/ /feed.xml 301',
    '/2016/03/22/the-copy--paste-guide-to-your-first-service-worker /2016/03/22/the-copy-paste-guide-to-your-first-service-worker 301',
    '/downloads/jquery.inview.js https://remy.github.io/jquery.inview/jquery.inview.js 301',

    // general
    '/thanks-rem https://www.amazon.co.uk/hz/wishlist/ls/1MEWSQO223XOH?type=wishlist&filter=unpurchased&sort=price-desc 301',

    '/api/iss/* http://api.open-notify.org/:splat  200',

    // silent redirects
    `/_logs/* https://remysharp-logs.netlify.com/:splat 200`,
    `/images/* https://download-remysharp.netlify.com/:splat 200`,
    `/downloads/* https://download-remysharp.netlify.com/:splat 200`,
    `/demo/* https://download-remysharp.netlify.com/:splat 200`,

    // magic redirect
    `/latest ${collections.blog[0].url} 302`, // important, this is temp redirect

    // cleaning up bad links
    '/feed/atom/ /feed.xml 301',
    '/feed/rss/ /feed.xml 301',
    '/demo/mousehold.js /js/404.js 404',
    '/apple-touch-icon.png /images/404.gif 404',
    '/apple-touch-icon-precomposed.png /images/404.gif 404',

    // tombstones
    '/2019/06/10/ejecting-disqus /404.html 410',
    '/tag/* /404-lite.html 410',
    '/labels/* /404-lite.html 410',
    '/category/* /404-lite.html 410',
    '/wp-content/* /404-lite.html 410',

    '/wp-login.php https://duckduckgo.com/?q=i+am+a+bad+person 301',
  ];

  res.push('/*/amp /:splat'); // (╯°□°)╯︵ ┻━┻  (where table = amp)
  res.push('/* /404.html 404');

  return res.join('\n');
};
