const URL = `https://es.dump.academy/guess-melody/questions`;

const loadJson = (url) => fetch(url).then((response) => response.json());


export default class Loader {


  static getLevels(cb) {
    fetch(URL).
        then((response) => response.json()).
        then((data) => {
          cb(data);
        });
  }
}


