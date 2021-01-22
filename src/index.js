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
  const createStyledHeader = (elementType) => {
    const selectionRange = getSelectionRange();
    const newHeader = createElement(elementType);
    selectionRange.surroundContents(newHeader);

    const defaultStyle = getStyle(newHeader).cssText;
    newHeader.className = `${elementType}-text`;
    const appliedStyle = getStyle(newHeader).cssText;

    const targetStyle = getModifiedStyles(defaultStyle, appliedStyle);
    newHeader.style = targetStyle;
  };

  textStyleButtons.forEach((button) => getElement(button).addEventListener('click', () => document.execCommand(button, false)));
  headerButtons.forEach((tag) => getElement(tag).addEventListener('click', () => createStyledHeader(tag)));
});
