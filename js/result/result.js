import {changeView} from '../util';
import ResultView from './result-view';
import {
  resultTry as data
} from '../data/game.data';

export default class ResultScreen {
  constructor() {
    this.view = new ResultView(data);
  }

  init() {
    changeView(this.view);
  }
}
