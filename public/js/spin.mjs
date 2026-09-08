(async () => {

  async function getPreview(album) {
    const iTunesUrl = `https://itunes.apple.com/search?term=${album.replace(/\s/g, '+')}&entity=song&attribute=albumTerm&country=GB&limit=200`;

    const store = localStorage.getItem(iTunesUrl);
    let res = null;
    if (!store) {
      const iTunes = await fetch(iTunesUrl).then(res => res.json());
      localStorage.setItem(iTunesUrl, JSON.stringify(iTunes));
      res = iTunes;
    } else {
      res = JSON.parse(store);
    }

    return res;
  }

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

    const method = 'user.getTopAlbums&period=7day'; // user.getrecenttracks
    const key = 'topalbums'; // recenttracks
    const lastfmUrl = `https://ws.audioscrobbler.com/2.0/?method=${method}&user=${lastfmUsername}&api_key=${lastfmApiKey}&format=json`;

    // const recentlyPlayed = await jsonp(lastfmUrl);
    let recentlyPlayed = await fetch(lastfmUrl).then(res => res.json());

    if (recentlyPlayed.error === 8) {
      await wait(1000);
      recentlyPlayed = await fetch(lastfmUrl).then(res => res.json());
    }

    if (recentlyPlayed.error) {
      throw new Error(`Last.fm API error: ${recentlyPlayed.message}`);
    }

    console.log({ recentlyPlayed });

    const last = recentlyPlayed[key].album[0];

    const getText = input => input['#text'];
    const artist = last.artist.name;
    const album = last.name;
    // const track = last.name;
    // const when = new Date(parseInt(last.date.uts * 1000));
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

  const iTunes = await getPreview(album);
  console.log({ iTunes });

  const playing = iTunes.results[0];

  // to work out if it's playing, we need the `when` and the current time
  // plus the length of the track
  let isPlaying = false;
  const now = Date.now();
  const ts = new Date(when).getTime();
  const duration = playing ? playing.trackTimeMillis : 0;
  isPlaying = now >= ts && now <= ts + duration;

  console.log({ isPlaying, track, when, cover, playing });

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
      data-playing="${isPlaying}"
    >

      <div class="cover">
        <img src="${cover}" alt="${track}" />
      </div>
      <p><span class="title album-name">${linkAlbum(playing.collectionViewUrl, album)}</span> <span class="by artist-name">${artist}</span></p>
    </div>
  `;

  document.querySelector('#recentlyListening').innerHTML = template;

})()