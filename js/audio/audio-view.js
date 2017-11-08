import AbstractView from '../view';
import {$$} from '../util';

export default class AudioView extends AbstractView {
  constructor(src) {
    super();
    this.src = src;
  }

  get template() {
    return `
<div class="player">
  <audio src="${this.src}" loop></audio>
  <button class="player-control player-control--pause"></button>
  <div class="player-track">
    <span class="player-status"></span>
  </div>
</div>`;
  }

  get audioElement() {
    return $$(`audio`, this.element);
  }

  appendToHolder(el) {
    $$(`.audioHolder`).append(el);
  }

}
