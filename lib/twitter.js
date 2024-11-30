module.exports = async () => {
  const res = await fetch(
    'https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=remysharp.com'
  );
  const data = await res.json();

  return {
    followers_count: data.followersCount,
    formatted_followers_count: `${data.followersCount.toLocaleString(
      'en-GB'
    )} followers`,
    name: 'rem',
    screen_name: 'remysharp.com',
  };
};
