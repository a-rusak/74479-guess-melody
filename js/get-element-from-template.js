function getElementFromTemplate(html) {
  const tmpElement = document.createElement(`div`);
  tmpElement.innerHTML = html;
  console.log(tmpElement.firstElementChild);
  return tmpElement.firstElementChild;
}
export default getElementFromTemplate;
