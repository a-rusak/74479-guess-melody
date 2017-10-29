import createElement from '../element-from-template';

const template = ({name, button, title, content}) => `
<section class="main main--welcome">
  <section class="logo" title="${name}"><h1>${name}</h1></section>
  <button class="main-play">${button}</button>
  <h2 class="title main-title">${title}</h2>
  <p class="text main-text">${content.rules
      .reduce((str, it, index, arr) => {
        const linebreak = (index < arr.length - 1) ? `<br>` : ``;
        it = it + linebreak;
        return str + it;
      }, ``)}</p>
</section>
`;

export const welcome = (data) => createElement(template(data));
