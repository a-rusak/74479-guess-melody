import welcomeScreen from './welcome/welcome';
import gameScreen from './game/game';
import resultScreen from './result/result';
import {$on} from './util';

const ControllerId = {
  WELCOME: ``,
  GAME: `game`,
  RESULT: `result`
};

const save = (state) => {
  return JSON.stringify(state);
};

const load = (dataString) => {
  try {
    return JSON.parse(dataString);
  } catch (e) {
    return false;
  }
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
      const [id, data] = hashValue.split(`?`);
      Application.changeHash(id, data);
    };
    window.onhashchange = hashChangeHandler;
    hashChangeHandler();

    $on(`game:start`, Application.showGame);
    $on(`game:replay`, Application.showGame);
    Application.showWelcome();
  }

  static changeHash(id, data) {
    const controller = Application.routes[id];
    if (controller) {
      if (data) {
        controller.init(load(data));
      } else {
        controller.init();
      }
    }
  }

  static showWelcome() {
    location.hash = ControllerId.WELCOME;
    // welcomeScreen.init();
    // Application.game = new GameScreen();
  }

  static showGame() {
    location.hash = ControllerId.GAME;
    // Application.routes[ControllerId.GAME].init(state);
    // Application.game.init(state);
  }

  static showResult(stat) {
    location.hash = `${ControllerId.RESULT}?${save(stat)}`;
    // Application.routes[ControllerId.RESULT].init(resultData[type]);
    // const resultScreen = new ResultScreen(resultData[type]);
  }
}
