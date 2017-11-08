import AbstractView from '../view';
import HeaderView from './header/header-view';
import LevelGenreView from './level/level-genre-view';
import LevelArtistView from './level/level-artist-view';
import {changeView, $$, $on} from '../util';

const Audio = {
  BUTTON: `player-control`,
  PLAY: `player-control--pause`,
  PAUSE: `player-control--play`
};

export default class GameView extends AbstractView {
  constructor(model) {
    super();
    this.model = model;
  }

  get template() {
    return `<section class="main"></section>`;
  }

  bind() {
    return super.bind();
  }

  bindAudioHandler() {
    [...this.level.element.querySelectorAll(`.${Audio.BUTTON}`)].forEach((button) => {
      $on(`click`, (evt) => this.audioHandler(evt), button);
    });
  }

  get view() {
    return {
      Genre(level) {
        return new LevelGenreView(level);
      },
      Artist(level) {
        return new LevelArtistView(level);
      }
    };
  }

  updateLevel(type) {
    this.level = this.view[type](this.model.getCurrentLevel());
    this.bindAudioHandler();
    changeView(this.level);
    this.updateHeader();
  }

  updateHeader() {
    const header = new HeaderView(this.model.getMistakes(), this.model.state.time);
    const headerElement = $$(`section.main > header`);
    if (headerElement !== null) {
      headerElement.remove();
    }
    $$(`section.main`).insertBefore(header.element, $$(`.main-wrap`));
  }

  audioHandler(evt) {
    if (evt && evt.target) {
      evt.preventDefault();
      const el = evt.target;
      if (el.classList.contains(Audio.PAUSE)) {
        // play
        [...this.level.element.querySelectorAll(`.${Audio.PLAY}`)].forEach((button) => {
          button.classList.remove(Audio.PLAY);
          button.classList.add(Audio.PAUSE);
          button.previousElementSibling.pause();
        });
        el.classList.remove(Audio.PAUSE);
        el.classList.add(Audio.PLAY);
        el.previousElementSibling.play();
      } else {
        // pause
        el.classList.remove(Audio.PLAY);
        el.classList.add(Audio.PAUSE);
        el.previousElementSibling.pause();
      }
    }
  }

}
