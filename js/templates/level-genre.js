import createElement from '../element-from-template';
import {header} from './header';

const template = ({
  level: {
    data: {
      title,
      questions
    }
  },
  remainingAttempts
}) => `
<section class="main main--level main--level-genre">

  ${header(remainingAttempts)}

  <div class="main-wrap">
    <h2 class="title">${title}</h2>
    <form class="genre">

      ${questionsTemplate(questions)}

      <button class="genre-answer-send" type="submit" disabled>Ответить</button>
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
            <audio src="${it.src}"></audio>
            <button class="player-control player-control--play"></button>
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

export const levelGenre = (data) => createElement(template(data));
