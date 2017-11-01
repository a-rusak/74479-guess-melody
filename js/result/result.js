import {
  resultTry as tryData,
  resultTime as timeData,
  resultWin as winData,
} from '../data/game.data';

const resultData = {
  TRY: tryData,
  TIME: timeData,
  WIN: winData
};


import {changeView} from '../util';
import ResultView from './result-view';

class ResultScreen {
  init(type) {
    this.view = new ResultView(resultData[type]);
    changeView(this.view);
  }
}

export default new ResultScreen();
