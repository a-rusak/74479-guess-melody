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

  static prepareDataAndInit() {
    Loader.getLevels().
        then((data) => {
          Application.init();
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
          Loader.cacheAudio([...audioUrls], () => Application.onLoad(adapt(data)));
        });
  }

  static onLoad(levelsData) {
    welcomeScreen.showPlayButton();
    Application.routes = {
      [ControllerId.GAME]: new GameScreen(levelsData),
      [ControllerId.RESULT]: resultScreen
    };
  }

  static init() {
    Application.routes = {
      [ControllerId.WELCOME]: welcomeScreen,
    };

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
