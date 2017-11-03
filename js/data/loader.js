const URL = `https://es.dump.academy/guess-melody/questions`;

export default class Loader {
  static getLevels() {
    return fetch(URL).
        then((response) => response.json()).
        then((data) => {
          return data;
        });
  }
}


