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

  showPlayButton() {
    this.view.showPlayButton();
  }

  updateProgress(loaded, total) {
    this.view.updateProgress(loaded, total);
  }

}

export default new WelcomeScreen();
