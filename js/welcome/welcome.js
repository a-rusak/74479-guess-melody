import {changeView} from '../util';
import WelcomeView from './welcome-view';
import {
  welcome as welcomeData
} from '../data/game.data';

class WelcomeScreen {
  constructor() {
    this.view = new WelcomeView(welcomeData);
  }

  init() {
    changeView(this.view);
  }
}

export default new WelcomeScreen();
