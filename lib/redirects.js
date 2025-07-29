module.exports = async (collections) => {
  const res = [
    // fixes
    ...collections.blog
      .filter((post) => post.data.date.toString().slice(0, 4) >= '2018')
      .map((post) => `/drafts/${post.slug} ${post.url} 301`),
    '/cli-book https://ko-fi.com/s/57e38e71bb 301',
    '/talks /speaking/ 301',
    '/subscribe /newsletters/ 301',
    '/my-years /search?q=title%3Amy%2020 301',
    '/feed/ /feed.xml 301',
    '/2016/03/22/the-copy--paste-guide-to-your-first-service-worker /2016/03/22/the-copy-paste-guide-to-your-first-service-worker 301',
    '/2020/10/25/How-to-import-arcade-fonts-as-sprites /2020/10/25/how-to-import-arcade-fonts-as-sprites 301',
    '/2020/04/29/were-not-smarter-than-browsers4 /2020/04/29/were-not-smarter-than-browsers 301',
    '/downloads/jquery.inview.js https://remy.github.io/jquery.inview/jquery.inview.js 301',

    // general
    '/thanks-rem https://www.amazon.co.uk/hz/wishlist/ls/1MEWSQO223XOH?type=wishlist&filter=unpurchased&sort=price-desc 301',
    '/bsky https://bsky.app/profile/remysharp.com 307',
    '/mastodon https://front-end.social/@rem 307',
    '/linkedin https://www.linkedin.com/in/remysharp/ 307',

    // silent redirects
    `/_logs/* https://remysharp-logs.netlify.com/:splat 200`,
    `/images/* https://download-remysharp.netlify.com/:splat 200`,
    `/downloads/* https://download-remysharp.netlify.com/:splat 200`,
    `/demo/* https://download-remysharp.netlify.com/:splat 200`,

    // helpful redirects
    '/christmas https://remysharp.com/2010/11/29/our-christmas-films-list 302',
    '/xmas https://remysharp.com/2010/11/29/our-christmas-films-list 302',
    '/movies https://remysharp.com/2010/11/29/our-christmas-films-list 302',

    // magic redirect
    `/latest ${collections.blog[0].url} 302`, // important, this is temp redirect
    '/shot/* https://s3.eu-west-2.amazonaws.com/screenshots.remysharp.com/:splat 200',

    // cleaning up bad links
    '/feed/atom/ /feed.xml 301',
    '/feed/rss/ /feed.xml 301',
    '/devlog/oh-mummy/* /devlog/go-mummy/:splat 301',
    '/demo/mousehold.js /js/404.js 404',
    '/apple-touch-icon.png /images/404.gif 404',
    '/apple-touch-icon-precomposed.png /images/404.gif 404',

    // tombstones
    '/2019/06/10/ejecting-disqus /404.html 410',
    '/tag/* /404-lite.html 410',
    '/labels/* /404-lite.html 410',
    '/category/* /404-lite.html 410',
    '/wp-content/* /404-lite.html 410',

    // junk requests and reducing 404 bandwidth
    '/serviceworkerinformationtobesaved /404-lite.html 404',
    '/xmlrpc.php /404-lite.html 404',
    '/*/wp-includes/wlwmanifest.xml /404-lite.html 404',

    // this is mostly wordpress hacking attempts
    '//* /404-lite.html 404',

    '/wp-login.php https://duckduckgo.com/?q=i+am+a+bad+person 301',
    '/*/wp-login.php https://duckduckgo.com/?q=i+am+a+bad+person 301',
    '/.env https://duckduckgo.com/?q=i+am+a+bad+person 301',

    // .well-known
    '/.well-known/host-meta* https://fed.brid.gy/.well-known/host-meta:splat 302',

    '/.well-known/webfinger* https://fed.brid.gy/.well-known/webfinger 302',
  ];

  res.push('/*/amp /:splat'); // (╯°□°)╯︵ ┻━┻  (where table = amp)
  res.push('/* /404.html 404');

  return res.join('\n');
};
