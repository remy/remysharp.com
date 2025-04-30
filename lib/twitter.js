module.exports = async () => {
  try {
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
  } catch (e) {
    return {
      followers_count: 3100,
      formatted_followers_count: `3.1K followers`,
      name: 'rem',
      screen_name: 'remysharp.com',
    };
  }
};
