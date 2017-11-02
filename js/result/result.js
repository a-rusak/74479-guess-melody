import {changeView} from '../util';
import ResultView from './result-view';
import ResultModel from './result-model';

class ResultScreen {
  init(result) {
    this.model = new ResultModel(result);
    this.view = new ResultView(this.model);
    changeView(this.view);
  }
}

export default new ResultScreen();
