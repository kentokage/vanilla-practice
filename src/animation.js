const DURATION = 1000;
const HEIGHT = 500;

const contentEl = document.getElementById("content");
const buttonEl = document.getElementById("button");

buttonEl.addEventListener("click", () => {
  // const open = contentEl.className.indexOf("content-show") !== -1;

  // css
  // if (open) {
  //   contentEl.classList.remove("content-show");
  //   contentEl.classList.add("content-hidden");
  // } else {
  //   contentEl.classList.remove("content-hidden");
  //   contentEl.classList.add("content-show");
  // }

  // js setInterval

  const open = contentEl.style.height === "500px";

  if (open) {
    doHide();
  } else {
    doOpen();
  }
});

let start = null;

function doOpen(timestamp) {
  if (!start) {
    start = performance.now();
  }

  const elasped = timestamp ? timestamp - start : 0;
  const percentDone = Math.min(elasped / DURATION, 1);
  content.style.height = percentDone * HEIGHT + "px";

  if (elasped < DURATION) {
    requestAnimationFrame(doOpen);
  } else {
    start = null;
  }
}

function doHide(timestamp) {
  if (!start) {
    start = performance.now();
  }

  const elasped = timestamp ? timestamp - start : 0;
  const percentDone = Math.min(elasped / DURATION, 1);
  content.style.height = HEIGHT - percentDone * HEIGHT + "px";

  if (elasped < DURATION) {
    requestAnimationFrame(doHide);
  } else {
    start = null;
  }
}
