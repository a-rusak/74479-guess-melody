class AudioModel {
  constructor() {
    this.elements = {};
  }
  setElement(src, element) {
    this.elements[src] = element;
  }
  getElement(src) {
    return this.elements[src];
  }
}

export default new AudioModel();
