export const changeFormAction = (div: HTMLElement, callback: Function) => {
  while (div.tagName != "FORM" && div != document.body) {
    div = div.parentElement;
  }

  div.onsubmit = () => {
    callback(div);
    return false;
  }
}