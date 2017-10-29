import createElement from '../element-from-template';
import {header} from './header';

class View {
  constructor(view) {
    this.view = view;
  }

  init() {
    this.button = this.view.querySelector(`.genre-answer-send`);
    this.form = this.view.querySelector(`.genre`);
    this.checkboxes = [...this.view.querySelectorAll(`.genre-answer [type="checkbox"]`)];
    for (let checkbox of this.checkboxes) {
      checkbox.addEventListener(`change`, this._checkBoxHandler.bind(this));
    }
    this._updateButtonState();
    this.button.addEventListener(`click`, () => {
      // this.form.reset();
    });
  }

  _updateButtonState() {
    let isNothingSelected = true;

    for (let checkbox of this.checkboxes) {
      if (checkbox.checked) {
        isNothingSelected = false;
        break;
      }
    }
    if (isNothingSelected) {
      this.button.setAttribute(`disabled`, `disabled`);
    } else {
      this.button.removeAttribute(`disabled`);
    }
  }

  _checkBoxHandler(evt) {
    // evt.stopPropagation();
    this._updateButtonState();
  }

}
// const html = `
const template = ({title, questions}) => `
<section class="main main--level main--level-genre">

  ${header()}

  <div class="main-wrap">
    <h2 class="title">${title}</h2>
    <form class="genre">

      ${questionsTemplate(questions)}

      <button class="genre-answer-send" type="submit">Ответить</button>
    </form>
  </div>
</section>
`;

const questionsTemplate = (data) => {
  return data.reduce((string, it, index) => {
    const n = index++;
    const itemTemplate = `
      <div class="genre-answer">
        <div class="player-wrapper">
          <div class="player">
            <audio></audio>
            <button class="player-control player-control--pause"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        <input type="checkbox" name="answer" value="answer-${n}" id="a-${n}">
        <label class="genre-answer-check" for="a-${n}"></label>
      </div>`;

    return string + itemTemplate;
  }, ``);
};

// export const levelGenre = createElement(html);

export const levelGenre = (data) => createElement(template(data));

// const view = new View(levelGenre);
// view.init();
