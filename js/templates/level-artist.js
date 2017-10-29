import createElement from '../element-from-template';
import {header} from './header';

const template = ({title, questions}) => `
<section class="main main--level main--level-artist">

  ${header()}

  <div class="main-wrap">
    <h2 class="title main-title">${title}</h2>
    <div class="player-wrapper">
      <div class="player">
        <audio></audio>
        <button class="player-control player-control--pause"></button>
        <div class="player-track">
          <span class="player-status"></span>
        </div>
      </div>
    </div>
    <form class="main-list">

      ${questionsTemplate(questions)}

    </form>
  </div>
</section>
`;

const questionsTemplate = (data) => {
  return data.reduce((string, it, index) => {
    const n = index++;
    const itemTemplate = `
      <div class="main-answer-wrapper">
        <input class="main-answer-r" type="radio" id="answer-${n}" name="answer" value="val-${n}"/>
        <label class="main-answer" for="answer-${n}">
          <img class="main-answer-preview" src="http://placehold.it/134x134"
              alt="${it}" width="134" height="134">
          ${it}
        </label>
      </div>`;

    return string + itemTemplate;
  }, ``);
};

export const levelArtist = (data) => createElement(template(data));
