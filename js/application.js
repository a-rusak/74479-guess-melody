import welcomeScreen from './welcome/welcome';
import GameScreen from './game/game';
import ResultScreen from './result/result';
import {
  resultTry as tryData,
  resultTime as timeData,
  resultWin as winData,
  levels as levelsData,
  initialGame
} from './data/game.data';
import {$on} from './util';

const resultData = {
  TRY: tryData,
  TIME: timeData,
  WIN: winData
};

export default class Application {
  static init(data) {
    welcomeScreen.init();
    Application.game = new GameScreen(data);
    $on(`start`, Application.startGame);
    $on(`replay`, Application.startGame);
  }

  static startGame(evt, state = initialGame) {
    Application.game.init(state);
    Application.game.tick();
  }

  static showResult(type) {
    Application.game.stopTimer();
    const resultScreen = new ResultScreen(resultData[type]);
    resultScreen.init();
  }

}

Application.init(levelsData);
