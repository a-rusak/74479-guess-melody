import welcomeScreen from './welcome/welcome';
import GameScreen from './game/game';
import ResultScreen from './result/result';
import {
  resultTry as tryData,
  resultWin as winData,
  levels as levelsData,
  initialGame
} from './data/game.data';
import {$on} from './util';

export default class Application {
  static init(data) {
    welcomeScreen.init();
    Application.game = new GameScreen(data);
    $on(`start`, Application.startGame);
    $on(`replay`, Application.startGame);
  }

  static startGame(evt, state = initialGame) {
    Application.game.init(state);
  }

  static fail() {
    const resultScreen = new ResultScreen(tryData);
    resultScreen.init();
  }

  static win() {
    const resultScreen = new ResultScreen(winData);
    resultScreen.init();
  }
}

Application.init(levelsData);
