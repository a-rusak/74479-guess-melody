import {welcome as welcomeElement} from './templates/welcome';

class App {
  constructor() {
    this.appElement = document.querySelector(`.app`);
    this.templateElement = document.querySelector(`#templates`);
    // this.views = [...this.templateElement.content.querySelectorAll(`section.main`)];
    this.views = [];
    this.step = 0;
    this.isAltPressed = false;
    this.init();
  }

  init() {
    this.views.push(welcomeElement);
    this.screen = this.step;
    // document.addEventListener(`keydown`, this.keyDownHandler.bind(this));
    // document.addEventListener(`keyup`, this.keyUpHandler.bind(this));
  }

  get screen() {
    return document.querySelector(`section.main`);
  }

  set screen(index) {
    this.appElement.replaceChild(this.views[index].cloneNode(true), this.screen);
  }

  keyDownHandler(evt) {
    if (this.isAltPressed) {
      if (evt.keyCode === 39 && this.step < this.views.length - 2) {
        this.step++;
      }
      if (evt.keyCode === 37 && this.step > 0) {
        this.step--;
      }
      event.preventDefault();
      this.screen = this.step;
    }
    if (evt.keyCode === 18) {
      this.isAltPressed = true;
      event.preventDefault();
    }
  }

  keyUpHandler(evt) {
    if (evt.keyCode === 18) {
      this.isAltPressed = false;
      event.preventDefault();
    }
  }
}

window.app = new App();
