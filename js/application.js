import welcomeScreen from './welcome/welcome';
import GameScreen from './game/game';
import ResultScreen from './result/result';
import {
  resultTry as tryData,
  resultTime as timeData,
  resultWin as winData,
  initialGame
} from './data/game.data';
import {$on} from './util';

const resultData = {
  TRY: tryData,
  TIME: timeData,
  WIN: winData
};

export default class Application {

  static showWelcome(data) {
    welcomeScreen.init();
    Application.game = new GameScreen(data);
    $on(`game:start`, Application.showGame);
    $on(`game:replay`, Application.showGame);
  }

  static showGame(evt, state = initialGame) {
    Application.game.init(state);
  }

  static showResult(type) {
    const resultScreen = new ResultScreen(resultData[type]);
    resultScreen.init();
  }
}
