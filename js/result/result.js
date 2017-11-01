import {
  resultTry as tryData,
  resultTime as timeData,
  resultWin as winData,
} from '../data/game.data';

import {changeView} from '../util';
import ResultView from './result-view';
import ResultModel from './result-model';

class ResultScreen {
  init(result) {
    this.model = new ResultModel(result);
    this.view = new ResultView(this.model);
    // this.view = new ResultView(resultData[type]);
    changeView(this.view);
  }
}

export default new ResultScreen();
