import {welcome} from "./templates/welcome";
import {levelArtist} from "./templates/level-artist";
import {levelGenre} from "./templates/level-genre";
import {resultWin} from "./templates/result-win";
import {resultTime} from "./templates/result-time";
import {resultTry} from "./templates/result-try";


export default class View {
  constructor() {
    this.templates = [
      welcome,
      levelArtist,
      levelGenre,
      resultWin,
      resultTime,
      resultTry
    ];
    this._index = 0;
    this.appElement = document.querySelector(`.app`);
    this.screen = this.templates[this.index];
    this.appElement.addEventListener(`click`, this.appClickHandler.bind(this));
  }

  get screen() {
    return document.querySelector(`section.main`);
  }

  set screen(view) {
    this.appElement.replaceChild(view, this.screen);
  }

  get index() {
    return this._index;
  }

  set index(index) {
    this._index = index;
  }

  appClickHandler(evt) {
    if (evt && evt.target) {
      if (evt.target.classList.contains(`main-play`)) {
        this.index = 1;
      }
      if (evt.target.classList.contains(`main-answer`)) {
        this.index = 2;
      }
    }
    this.screen = this.templates[this.index];
  }
}
