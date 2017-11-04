const URL = `https://es.dump.academy/guess-melody/questions`;
const CHUNK_SIZE = 4;
let AUDIO_LOAD_TIMEOUT = 5000; // 5 sec timeframe for load one song

let timeout;
let notLoadedUrls = [];

export default class Loader {
  static getLevels() {
    return fetch(URL)
        .then((response) => response.json())
        .then((data) => {
          return data;
        });
  }

  static loadChunk(urls) {
    return Promise.all(
        urls.map(
            (url) => {
              return new Promise((resolve, reject) => {
                const audio = new Audio();
                audio.addEventListener(`canplaythrough`, () => resolve(url), false);
                audio.src = url;
                timeout = setTimeout(() => reject(url), AUDIO_LOAD_TIMEOUT);
              });
            }
        )
    );
  }

  static loadBundle(bundles) {
    let chain = Promise.resolve();

    bundles.forEach((chunk) => {
      chain = chain
          .then(() => {
            clearTimeout(timeout);
            return Loader.loadChunk(chunk);
          })
          .catch((url) => {
            notLoadedUrls.push(url);
          });
    });

    return chain;
  }

  static createBundle(urls) {
    return urls.reduce((acc, it, index) => {
      const bundleIndex = parseInt(index / CHUNK_SIZE, 10);
      if (typeof acc[bundleIndex] === `undefined`) {
        acc[bundleIndex] = [];
      }
      acc[bundleIndex][index % CHUNK_SIZE] = it;
      return acc;
    }, []);
  }

  static cacheAudio(urls, cb) {
    const bundle = Loader.createBundle(urls);
    Loader.loadBundle(bundle)
        .then(() => {
          if (notLoadedUrls.length > 0) {
            AUDIO_LOAD_TIMEOUT *= 2;
            Loader.cacheAudio(notLoadedUrls, cb);
            notLoadedUrls = [];
          } else {
            cb();
          }
        });
  }
}
