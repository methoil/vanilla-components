// make the progress bar load over 5 seconds

function startLoading() {
  let count = 0;
  const max = 100;
  const increment = 3;

  const greenBar = document.getElementById("green-bar");
  const redBar = document.getElementById("red-bar");
  const percent = document.getElementById("status-number");

  setLoading();

  function setLoading() {
    greenBar.style.width = `${increment * count}px`;
    redBar.style.width = `${300 - increment * count}px`;
    percent.innerHTML = `${count}%`;
    count++;

    setTimeout(() => {
      if (count <= max) {
        setLoading();
      }
    }, 50);
  }
}
