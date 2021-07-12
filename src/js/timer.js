import '../sass/timer.scss';
import timerHTML from '../templates/timer.hbs';
const Swal = require('sweetalert2')

document.body.insertAdjacentHTML('afterbegin', timerHTML());

const refs = {
  dateSelector: document.getElementById('date-selector'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.dateSelector.addEventListener('input', saveDate);
refs.startBtn.disabled = true;

let userDate;

function saveDate() {
  userDate = new Date(refs.dateSelector.value) - 3 * 60 * 60 * 1000;
  if (userDate < new Date()) {
  refs.startBtn.disabled = true;
    Swal.fire({
  title: 'Error detected!',
  text: 'Please choose a date in the future',
  icon: 'error',
  confirmButtonText: 'Acknowledged H.Q.'
})
  } else {
    refs.startBtn.disabled = false;
    return userDate;
  } 
}


class Timer {
  constructor({ onTick }) {
    this.intervalId = null;
    this.isActive = false;
    this.onTick = onTick;

    this.init();
  }

  init() {
    const time = this.convertMs(0);
    this.onTick(time);
  }

  start() {
    if (this.isActive) {
      clearInterval(this.intervalId);
      this.isActive = false;
      const time = this.convertMs(0);
      this.onTick(time);
    }

    const startTime = userDate;
    this.isActive = true;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      const time = this.convertMs(deltaTime);
     
      this.onTick(time);
    }, 1000);
  }

  convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = this.pad(Math.floor(ms / day));
  // Remaining hours
  const hours = this.pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = this.pad(Math.floor((((ms % day) % hour) % minute) / second));

      return { days, hours, minutes, seconds };
  }
  
  pad(value) {
    return String(value).padStart(2, '0');
  }
}



const timer = new Timer({
  onTick: updateClockface,
});

refs.startBtn.addEventListener('click', timer.start.bind(timer));


/*
 * - Принимает время в миллисекундах
 * - Высчитывает сколько в них вмещается часов/минут/секунд
 * - Рисует интерфейс
 */
function updateClockface({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}

