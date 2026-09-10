(async () => {

  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function getRecent() {
    let store = localStorage.getItem('lastfmRecentlyPlayed');

    if (store) {
      store = JSON.parse(store);
      if (store.ts > Date.now() - (2 * 60 * 1000)) {
        return store.data;
      }
    }

    const lastfmUsername = 'remysharp';
    const lastfmApiKey = '6e84523ca2a2573af6b999d433f25d3e';

    const method = 'user.getrecenttracks'; // user.getTopAlbums&period=1day
    const key = 'recenttracks'; // topalbums
    const lastfmUrl = `https://ws.audioscrobbler.com/2.0/?method=${method}&user=${lastfmUsername}&api_key=${lastfmApiKey}&format=json&limit=200`;

    // const recentlyPlayed = await jsonp(lastfmUrl);
    let recentlyPlayed = await fetch(lastfmUrl).then(res => res.json());

    if (recentlyPlayed.error === 8) {
      await wait(1000);
      recentlyPlayed = await fetch(lastfmUrl).then(res => res.json());
    }

    if (recentlyPlayed.error) {
      throw new Error(`Last.fm API error: ${recentlyPlayed.message}`);
    }

    const twoDaysAgo = Date.now() - (1000 * 60 * 60 * 24 * 2);
    const tracks = recentlyPlayed[key].track;
    const recentTracks = tracks.filter(track => {
      if (!track.date) {
        return false;
      }
      const playTime = parseInt(track.date.uts) * 1000;

      return playTime > twoDaysAgo;
    }).sort((a, b) => parseInt(b.date.uts) - parseInt(a.date.uts));


    const last = recentTracks[0];
    const getText = input => input['#text'];
    const artist = getText(last.artist);
    const album = getText(last.album);

    const cover = getText(last.image.pop());

    const data = {
      artist, album, cover
    };

    localStorage.setItem('lastfmRecentlyPlayed', JSON.stringify({
      ts: Date.now(),
      data
    }));

    return data;
  }

  const { album, track, cover, when, artist } = await getRecent();

  function linkAlbum(albumUrl, album) {
    if (albumUrl) {
      return `<a target="_blank" href="${albumUrl}">${album}</a>`;
    }
    return album;
  }

  const template = `
    <h3>Listening</h3>
    <div
      class="track"
    >

      <div class="cover">
        <img src="${cover}" alt="${track}" />
      </div>
      <p><span class="title album-name">${linkAlbum(`https://duckduckgo.com/?q=${encodeURIComponent(artist)}+${encodeURIComponent(album)}+album`, album)}</span> <span class="by artist-name">${artist}</span></p>
    </div>
  `;

  document.querySelector('#recentlyListening').innerHTML = template;

})()