import welcomeScreen from './welcome/welcome';
import gameScreen from './game/game';
import resultScreen from './result/result';
import {$on, getJson, getParams} from './util';

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
