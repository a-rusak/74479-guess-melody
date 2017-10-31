import AbstractView from '../../view_';

const mistakes = (errors) => {
  let mistakeElement = ``;
  if (errors > 0) {
    while (errors) {
      mistakeElement += `<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`;
      errors--;
    }
  }
  return mistakeElement;
};

export default class HeaderView extends AbstractView {
  constructor(errors) {
    super();
    this.errors = errors;
  }

  get template() {
    return `
<div>
  <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
    <circle
      cx="390" cy="390" r="370"
      class="timer-line"
      style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

    <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
      <span class="timer-value-mins">05</span><!--
      --><span class="timer-value-dots">:</span><!--
      --><span class="timer-value-secs">00</span>
    </div>
  </svg>
  <div class="main-mistakes">
    ${mistakes(this.errors)}
  </div>
</div>`;
  }
}

