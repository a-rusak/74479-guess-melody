import {welcome} from "./templates/welcome";
import {levelArtist} from "./templates/level-artist";
import {levelGenre} from "./templates/level-genre";
import {resultWin} from "./templates/result-win";
import {resultTime} from "./templates/result-time";
import {resultTry} from "./templates/result-try";
import {result} from "./templates/result";
import {
  levels as levelsData,
  welcome as welcomeData
} from './data/game.data';

export default class View {
  constructor() {
    this.templates = {
      welcome,
      levelArtist,
      levelGenre,
      resultWin,
      resultTime,
      resultTry,
      result
    };
    this._init();
  }

  _init() {
    this.appElement = document.querySelector(`.app`);
    this.on(`click`, this.appClickHandler.bind(this));
  }

  get screen() {
    return document.querySelector(`section.main`);
  }

  set screen(view) {
    this.appElement.replaceChild(view, this.screen);
  }

  appClickHandler(evt) {
    if (evt && evt.target) {
      const el = evt.target;

      if (el.classList.contains(`main-play`)) {
        this.trigger(`start`);
      }
      if (el.classList.contains(`main-answer-r`)) {
        const answer = el.form.elements.answer.value;
        this.trigger(`answerArtist`, answer);
      }
      if (el.classList.contains(`genre-answer-send`)) {
        evt.preventDefault();
        const answers = [...el.form.elements.answer];
        this.trigger(`answerGenre`, answers);
      }
      if (evt.target.classList.contains(`main-replay`)) {
        this.trigger(`replay`);
      }
    }
  }

  on(eventName, callback, el = this.appElement) {
    el.addEventListener(eventName, (evt) => {
      callback(evt);
    });
  }

  trigger(eventName, data = null) {
    let customEvent = new CustomEvent(eventName, {detail: data});

    this.appElement.dispatchEvent(customEvent);
  }
}
