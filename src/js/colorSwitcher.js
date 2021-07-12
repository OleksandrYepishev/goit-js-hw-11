import '../sass/colorSwitcher.scss';

const startBtn = document.querySelector('[data-action="start"]');
const stopBtn = document.querySelector('[data-action="stop"]');
const body = document.querySelector('body');

startBtn.addEventListener('click', colorSwitherStart);
stopBtn.addEventListener('click', colorSwitherStop);
let timerId = null;
stopBtn.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function colorSwitherStart() {
  timerId = setInterval(() => {
      body.style.backgroundColor = getRandomHexColor();
  
    ;
  }, 1000);
  startBtn.disabled = true;
  stopBtn.disabled = false;
}

function colorSwitherStop() {
    clearInterval(timerId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
};