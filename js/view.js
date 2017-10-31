import {welcome} from "./templates/welcome";
import {levelArtist} from "./templates/level-artist";
import {levelGenre} from "./templates/level-genre";
import {result} from "./templates/result";

export default class View {
  constructor() {
    this.templates = {
      welcome,
      levelArtist,
      levelGenre,
      result
    };
    this._init();
    this.player = {
      button: `player-control`,
      play: `player-control--pause`,
      pause: `player-control--play`
    };
  }

  _init() {
    this.appElement = document.querySelector(`.app`);
    // this.on(`click`, this.appClickHandler.bind(this));
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

      // Trigger game events
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
      if (el.classList.contains(`main-replay`)) {
        this.trigger(`replay`);
      }

      // audio play/pause control
      if (el.classList.contains(this.player.button)) {
        evt.preventDefault();
        if (el.classList.contains(this.player.pause)) {
          // play
          this.pausedAllTracks();
          el.classList.remove(this.player.pause);
          el.classList.add(this.player.play);
          el.previousElementSibling.play();
        } else {
          // pause
          el.classList.remove(this.player.play);
          el.classList.add(this.player.pause);
          el.previousElementSibling.pause();
        }
      }

      // Disable  answer button on Genre page if nothing selected
      if (el.classList.contains(`genre-answer-check`)) {
        const answerButton = this.appElement.querySelector(`.genre-answer-send`);
        const checkboxes = [...this.appElement.querySelectorAll(`.genre-answer input[type="checkbox"]`)];
        setTimeout(() => {
          if (checkboxes.some((it) => it.checked)) {
            answerButton.removeAttribute(`disabled`);
          } else {
            answerButton.setAttribute(`disabled`, `disabled`);
          }
        }, 0);
      }
    }
  }

  pausedAllTracks() {
    const playsButtons = [...this.appElement.querySelectorAll(`.${this.player.play}`)];
    playsButtons.forEach((button) => {
      button.classList.remove(this.player.play);
      button.classList.add(this.player.pause);
      button.previousElementSibling.pause();
    });
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
