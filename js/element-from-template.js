export default function (html) {
  const tmpElement = document.createElement(`div`);
  tmpElement.innerHTML = html;
  return tmpElement.firstElementChild;
}
