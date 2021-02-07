const headerButtons = ['h1', 'h2'];
const textStyleButtons = ['bold', 'italic'];

const getHTMLBody = (html) => new DOMParser().parseFromString(html, 'text/html').querySelector('body');
const getElement = (name) => document.getElementsByClassName(name)[0];
const createElement = (tag) => document.createElement(tag);
const getSelection = () => window.getSelection();
const getSelectionRange = () => getSelection().getRangeAt(0);
const getStyle = (element) => window.getComputedStyle(element);

const getModifiedStyles = (initial, modified) => {
  const initialRules = initial.split(';');
  const modifiedRules = modified.split(';');

  return modifiedRules.reduce((res, currRule, idx) => (currRule === initialRules[idx] ? res : [...res, currRule]), []).join(';');
};

const isAreaEditable = () => {
  const selectionRange = getSelection();
  const editableArea = getElement('edit-area');

  return editableArea.contains(selectionRange.focusNode);
};

const sanitizeText = (text) => text
  .replace(/&/g, '&amp;')
  .replace(/'/g, '&#x27;')
  .replace(/"/g, '&quot;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/\//g, '&#x2F;');

document.addEventListener('DOMContentLoaded', () => {
  const createStyledHeader = (elementType) => {
    const selectionRange = getSelectionRange();

    const newHeader = createElement(elementType);
    newHeader.appendChild(selectionRange.extractContents());
    selectionRange.insertNode(newHeader);

    const defaultStyle = getStyle(newHeader).cssText;
    newHeader.className = `${elementType}-text`;
    const appliedStyle = getStyle(newHeader).cssText;

    const targetStyle = getModifiedStyles(defaultStyle, appliedStyle);
    newHeader.style = targetStyle;
  };

  document.addEventListener('paste', (e) => {
    e.preventDefault();

    const html = e.clipboardData.getData('text/html');
    if (!html) {
      const text = sanitizeText(e.clipboardData.getData('text/plain'));
      document.execCommand('insertHTML', false, text);
    } else {
      const body = getHTMLBody(html);
      document.execCommand('insertHTML', false, body.innerHTML);
    }
  });

  textStyleButtons.forEach((button) => getElement(button).addEventListener('click', () => {
    if (isAreaEditable()) {
      document.execCommand(button, false);
    }
  }));
  headerButtons.forEach((tag) => getElement(tag).addEventListener('click', () => {
    if (isAreaEditable()) {
      createStyledHeader(tag);
    }
  }));
});
