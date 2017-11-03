import welcomeScreen from './welcome/welcome';
import gameScreen from './game/game';
import resultScreen from './result/result';
import {$on, getJson, getParams} from './util';
import Loader from './data/loader';

const ControllerId = {
  WELCOME: ``,
  GAME: `game`,
  RESULT: `result`
};

export default class Application {

  static init() {
    Application.routes = {
      [ControllerId.WELCOME]: welcomeScreen,
      [ControllerId.GAME]: gameScreen,
      [ControllerId.RESULT]: resultScreen
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

    Loader.getLevels(Application.show);
  }

  static show(data) {
    const levels = data.map((level) => {
      switch (level.type) {
        case `artist`:
          break;
        case `genre`:
          break;
        default:
          throw new TypeError(`Unknown question type: ${level.type}`);
      }
    });
  }

  static changeHash(id, params) {
    gameScreen.stopTimer();
    if (gameScreen.AnswerTimer) {
      gameScreen.AnswerTimer.stop();
      gameScreen.AnswerTimer.reset();
    }
    const controller = Application.routes[id];
    if (controller) {
      if (params) {
        controller.init(getJson(params));
      } else {
        controller.init();
      }
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
