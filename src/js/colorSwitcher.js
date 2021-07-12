import '../sass/colorSwitcher.scss';

const startBtn = document.querySelector('[data-action="start"]');
const stopBtn = document.querySelector('[data-action="stop"]');
const body = document.querySelector('body');

startBtn.addEventListener('click', colorSwitherStart);
stopBtn.addEventListener('click', colorSwitherStop);
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function colorSwitherStart() {
    timerId = setInterval(() => {
    ;
  }, 1000);
}

function colorSwitherStop() {
    clearInterval(timerId);
    body.style.backgroundColor = getRandomHexColor;
};