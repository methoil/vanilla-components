// make the progress bar load over 5 seconds
const max = 100;
const progressWidth = 300;
const increment = 3;
let count = 0;

let greenBar;
let redBar;
let percent;
let inputTextBox;

function setup() {
  greenBar = document.getElementById("green-bar");
  redBar = document.getElementById("red-bar");
  percent = document.getElementById("status-number");
  inputTextBox = document.getElementById("input-text-box");
}

function onInputChange(event) {
  if (event && event.keyCode === 13) {
    startLoading();
  }
}

function startLoading() {
  const input = inputTextBox.value.replace(/\D/g, "");
  if (!input) {
    return;
  }
  const time = (parseInt(input) * 1000) / max;
  count = 0;
  setLoading();

  function setLoading() {
    greenBar.style.width = `${increment * count}px`;
    redBar.style.width = `${progressWidth - increment * count}px`;
    percent.innerHTML = `${count}%`;
    count++;

    // setInterval is a thing....
    setTimeout(() => {
      if (count <= max) {
        setLoading();
      }
    }, time);
  }
}
