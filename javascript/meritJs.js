var isTriple = false;
var isQuintuple = false;
var isGatling = false;
var galtlAmt = 1;
var galtCost = 1;
var meritPerSec = 0;
document.addEventListener("DOMContentLoaded", () => {
  popUp.style.display = "block";
});
infoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  popUp.style.display = "none";
  if (foodDisc.value === "carn") {
    carnivore();
  }
});
gButton.addEventListener("click", generate);
gButton.addEventListener("click", shopShow);

triButton.addEventListener("click", triple);
quintButton.addEventListener("click", quintuple);
gatlButton.addEventListener("click", () => {
  gatlButton.disabled = true;
  Gatling();
});
function generate() {
  if (isQuintuple) {
    meritAmt.innerHTML = Number(meritAmt.innerHTML) + 5;
    playFallAudio();
  } else if (isTriple) {
    meritAmt.innerHTML = Number(meritAmt.innerHTML) + 3;

    playFallAudio();
  } else {
    meritAmt.innerHTML++;
    playFallAudio();
  }

  if (meritAmt.innerHTML >= 10) {
    shopShow();
  }
  if (meritAmt.innerHTML >= 100 && !isTriple) {
    triButton.disabled = false;
  }
  if (meritAmt.innerHTML >= 500 && !isQuintuple) {
    quintButton.disabled = false;
  }
  if (meritAmt.innerHTML >= 1000 * galtCost) {
    gatlButton.disabled = false;
  }
}
function carnivore() {
  var timeId = window.setInterval(
    () => --meritAmt.innerHTML,

    1000
  );
  return timeId;
}
//* -----------------------------------------------------------------------------
// *                     Shop 功能
//* -------------------------------------------------------------------------

function triple() {
  isTriple = true;
  meritAmt.innerHTML = Number(meritAmt.innerHTML) - 100;

  triButton.disabled = true;
}
function quintuple() {
  isQuintuple = true;
  meritAmt.innerHTML = Number(meritAmt.innerHTML) - 500;

  quintButton.disabled = true;
}
function Gatling() {
  isGatling = true;
  meritAmt.innerHTML = Number(meritAmt.innerHTML) - 1000 * galtCost;

  var timeId = window.setInterval(
    () => meritAmt.innerHTML = Number(meritAmt.innerHTML)+(120 * galtlAmt),
    1000
  );
  galtlAmt++;
  galtCost++;

  return timeId;
}
//* -----------------------------------------------------------------------------
// *                     Css 控制
//* -------------------------------------------------------------------------

// ! 要再修改
// TODO 再修改
function shopShow() {
  if (meritAmt.innerHTML > 9) {
    shop.classList.remove("hidden");
    shop.classList.add("visible");
  }
}

function playFallAudio() {
  const audio = document.createElement("audio");
  audio.src = "../sounds/fall.mp3";
  audio.play();
}
