import welcomeScreen from './welcome/welcome';
import GameScreen from './game/game';
import resultScreen from './result/result';
import {$on, getJson, getParams} from './util';
import Loader from './data/loader';
import adapt from './data/level-adapter';

const ControllerId = {
  WELCOME: ``,
  GAME: `game`,
  RESULT: `result`
};

export default class Application {
  static init(levelsData) {
    Application.routes = {
      [ControllerId.WELCOME]: welcomeScreen,
      [ControllerId.GAME]: new GameScreen(levelsData),
      [ControllerId.RESULT]: resultScreen
    };
    Application.audioUrls = new Set();

    const hashChangeHandler = () => {
      const hashValue = location.hash.replace(`#`, ``);
      const [id, params] = hashValue.split(`?`);
      Application.changeHash(id, params);
    };
    window.onhashchange = hashChangeHandler;
    hashChangeHandler();

    $on(`game:start`, Application.showGame);
    $on(`game:replay`, Application.showGame);
  }

  static prepareDataAndInit() {
    Loader.getLevels().
        then((data) => {
          Application.init(adapt(data));
          Application.fillAudioUrls(data);
          Loader.cacheAudio([...Application.audioUrls], () => Application.onCacheLoaded());
        });
  }

  static fillAudioUrls(data) {
    data.forEach((it) => {
      switch (it.type) {
        case `artist`:
          Application.audioUrls.add(it.src);
          break;
        case `genre`:
          it.answers.forEach((item) => {
            Application.audioUrls.add(item.src);
          });
          break;
        default:
          throw new TypeError(`Unknown question type: ${it.type}`);
      }
    });
  }

  static createAudioElements() {

  }

  static onCacheLoaded() {
    welcomeScreen.showPlayButton();
  }

  static updateProgress(loaded, total) {
    welcomeScreen.updateProgress(loaded, total);
  }

  static changeHash(id, params) {
    Application.stopGameTimers(Application.routes.game);
    const controller = Application.routes[id];
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
}
