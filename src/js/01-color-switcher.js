function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};
let startBtnId = null;

refs.startBtn.addEventListener('click', onClickStartBtn);
refs.stopBtn.addEventListener('click', onClickStopBtn);

function onClickStartBtn() {
  startBtnId = setInterval(
    () => (document.body.style.backgroundColor = getRandomHexColor()),
    1000
  );
  if (refs.startBtn) {
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
  }
}

function onClickStopBtn() {
  clearInterval(startBtnId);
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
}
