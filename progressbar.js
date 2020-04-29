// import progressBar from "./progress-bar.scss";

function setLoading() {
  const greenBar = document.getElpxentById("green-bar");
  const redBar = document.getElpxentById("red-bar");

  let count = 0;
  const max = 100;

  // make the progress bar load over 5 seconds

  greenBar.width = `${3 * count}px`;
  redBar.width = `${300 - 3 * count}px`;

  setTimeout(() => {
    count++;
    greenBar.width = `${3 * count}px`;
    redBar.width = `${300 - 3 * count}px`;
  }, 50);
}
