import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.getElementById('datetime-picker');
const startBtn = document.querySelector('[data-start]');
const day = document.querySelector('[data-days]');
const hour = document.querySelector('[data-hours]');
const minute = document.querySelector('[data-minutes]');
const second = document.querySelector('[data-seconds]');
let startTime = 0;
let selectedTime = 0;

startBtn.disabled = true;
startBtn.addEventListener('click', onStart);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    startBtn.disabled = false;

    startTime = options.defaultDate.getTime();
    selectedTime = selectedDates[0].getTime();
    const deltaTime = selectedTime - startTime;

    if (deltaTime < 0) {
      Notify.failure('Please choose a date in the future', { timeout: 1000 });
      startBtn.disabled = true;
    }
  },
};

flatpickr(input, options);

function onStart() {
  intervalId = setInterval(() => {
    const currentTime = new Date().getTime();
    const delta = selectedTime - currentTime;
    if (delta > 0) {
      const time = convertMs(delta);
      updateClockface(time);
    } else {
      stop();
    }
  }, 1000);
}

function stop() {
  clearInterval(intervalId);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function updateClockface({ days, hours, minutes, seconds }) {
  day.textContent = `${days}`;
  hour.textContent = `${hours}`;
  minute.textContent = `${minutes}`;
  second.textContent = `${seconds}`;
}
