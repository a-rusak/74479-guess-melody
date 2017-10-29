import createElement from '../element-from-template';

const template = ({name, button, title, content, isWin, score, errors}) => {
  const winText = `За&nbsp;3&nbsp;минуты и 25&nbsp;секунд
  <br>вы&nbsp;набрали ${score} баллов (8 быстрых)
  <br>совершив ${errors} ошибки`;

  return `
    <section class="main main--result">
      <section class="logo" title="${name}"><h1>${name}</h1></section>

      <h2 class="title">${title}</h2>
      <div class="main-stat">
        ${ isWin ? winText : content }
      </div>
      ${ isWin ? `<span class="main-comparison">${content}</span>` : `` }

      <span role="button" tabindex="0" class="main-replay">${button}</span>
    </section>`;
};

export const result = (data) => createElement(template(data));
