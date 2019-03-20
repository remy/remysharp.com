module.exports = () => {
  const output = '_site';
  const input = 'public';

  const misc = {
    site_title: "remy sharp's b:log",
    site_description: 'About [code] and all that jazz',
    site_url: 'https://remysharp.com',
    analytics: 'UA-1656750-1',
  };

  return { input, output, ...misc };
};
