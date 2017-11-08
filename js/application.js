import welcomeScreen from './welcome/welcome';
import GameScreen from './game/game';
import resultScreen from './result/result';
import {$on, getJson, getParams} from './util';
import Loader from './data/loader';
import adaptLoadedData from './data/adapt-loaded-data';

const ControllerId = {
  WELCOME: ``,
  GAME: `game`,
  RESULT: `result`
};

export default class Application {

  prepareDataAndInit() {
    Loader.getLevels().
        then((data) => {
          this.init(adaptLoadedData(data));
          const audioUrls = new Set();

          data.forEach((it) => {
            switch (it.type) {
              case `artist`:
                audioUrls.add(it.src);
                break;
              case `genre`:
                it.answers.forEach((item) => {
                  audioUrls.add(item.src);
                });
                break;
              default:
                throw new TypeError(`Unknown question type: ${it.type}`);
            }
          });
          Application.audioTotalSize = audioUrls.size;
          Loader.cacheAudio([...audioUrls], () => Application.onLoad());
        });
  }

  static onLoad() {
    welcomeScreen.showPlayButton();
  }

  init(levelsData) {
    this.routes = {
      [ControllerId.WELCOME]: welcomeScreen,
      [ControllerId.GAME]: new GameScreen(levelsData),
      [ControllerId.RESULT]: resultScreen
    };

    const hashChangeHandler = () => {
      const hashValue = location.hash.replace(`#`, ``);
      const [id, params] = hashValue.split(`?`);
      this.changeHash(id, params);
    };
    window.onhashchange = hashChangeHandler;
    hashChangeHandler();

    $on(`game:start`, Application.showGame);
    $on(`game:replay`, Application.showGame);
  }

  changeHash(id, params) {
    Application.stopGameTimers(this.routes.game);
    const controller = this.routes[id];
    if (controller) {
      if (params) {
        controller.init(getJson(params));
      } else {
        controller.init();
      }
    }
  }

  static stopGameTimers(game) {
    if (game && game.AnswerTimer) {
      game.stopTimer();
      game.AnswerTimer.stop();
      game.AnswerTimer.reset();
    }
  }

  static showWelcome() {
    location.hash = ControllerId.WELCOME;
  }

  static showGame() {
    location.hash = ControllerId.GAME;
  }

  static showResult(statistics) {
    const urlParams = statistics ? getParams(statistics) : ``;
    location.hash = `${ControllerId.RESULT}?${urlParams}`;
  }
  // updateProgress
  static updateProgress(loaded) {
    welcomeScreen.updateProgress(loaded, Application.audioTotalSize);
  }

}
