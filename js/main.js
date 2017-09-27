class App {
  constructor() {
    this.APP = document.querySelector(`.app`);
    this.TEMPLATE = document.querySelector(`#templates`);
    this.SCREEN = [...this.TEMPLATE.content.querySelectorAll(`section.main`)];
    this.STEP = 0;
    this.isAltPressed = false;
    this.init();
  }

  init() {
    this.screen = this.STEP;
    document.addEventListener(`keydown`, this.keyDownHandler.bind(this));
    document.addEventListener(`keyup`, this.keyUpHandler.bind(this));
  }

  get screen() {
    return document.querySelector(`section.main`);
  }

  set screen(index) {
    this.APP.replaceChild(this.SCREEN[index].cloneNode(true), this.screen);
  }

  keyDownHandler(evt) {
    if (this.isAltPressed) {
      if (evt.keyCode === 39 && this.STEP < this.SCREEN.length - 2) {
        this.STEP++;
      }
      if (evt.keyCode === 37 && this.STEP > 0) {
        this.STEP--;
      }
      event.preventDefault();
      this.screen = this.STEP;
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
