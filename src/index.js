const headerButtons = ['h1', 'h2'];
const textStyleButtons = ['bold', 'italic'];
const getElement = (name) => document.getElementsByClassName(name)[0];

const getSelectionRange = () => window.getSelection().getRangeAt(0);
const createElement = (tag) => document.createElement(tag);
const getStyle = (element) => window.getComputedStyle(element);

const getModifiedStyles = (initial, modified) => {
  const initialRules = initial.split(';');
  const modifiedRules = modified.split(';');
  return initialRules.reduce((res, currRule, idx) => (currRule === modifiedRules[idx] ? res : [...res, currRule]), []).join(';');
};
document.addEventListener('DOMContentLoaded', () => {
  const createInlineHeader = (elementType) => {
    const selectionRange = getSelectionRange();
    console.log('selection', selectionRange);
    // const temp = selectionRange.extractContents();
    // const el = document.createElement(elementType);
    // el.className = `${elementType}-text`;
    // el.appendChild(temp);

    const newHeader = createElement(elementType);
    selectionRange.surroundContents(newHeader);
    const defaultStyle = getStyle(newHeader).cssText;
    console.log('object', newHeader.style)
    newHeader.className = `${elementType}-text`;
    const appliedStyle = getStyle(newHeader).cssText;
    console.log('object', newHeader.style)
    console.log('newHeader.style', newHeader.style);
    console.log('newHeader.style', newHeader.getAttribute('style'));

    const test = getModifiedStyles(defaultStyle, appliedStyle);
    console.log('test', test);

    // console.log('getStyle(newHeader)', getStyle(newHeader).cssText);

    // console.log('node', node);
    // console.log('window.getSelection()', window.getSelection())
    // const test = window.getComputedStyle(element);
    // console.log('test', test)
  };

  textStyleButtons.forEach((button) => getElement(button).addEventListener('click', () => document.execCommand(button, false)));
  headerButtons.forEach((button) => getElement(button).addEventListener('click', () => createInlineHeader(button)));
});
