import AudioView from './audio-view';

export default class Audio {
  constructor(src) {
    this.view = new AudioView(src);
    this.view.appendToHolder(this.view.element);
  }
  auidioElementsHolder() {
  }
}
