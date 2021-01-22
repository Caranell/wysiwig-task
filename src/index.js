const headerButtons = ['h1', 'h2'];
const textStyleButtons = ['bold', 'italic'];

const getButton = (name) => document.getElementsByClassName(name)[0];

textStyleButtons.forEach((button) => getButton(button).addEventListener('click', () => document.execCommand(button, false)));
headerButtons.forEach((button) => getButton(button).addEventListener('click', () => document.execCommand('formatBlock', false, `<${button}>`)));
