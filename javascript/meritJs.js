var isTriple = false;
var isQuintuple = false;
var isGatling = false;
var galtlAmt = 1;
var galtCost = 1;
var galtNum = 0;
var meritPerSec = 0;
var catButton;

document.addEventListener("DOMContentLoaded", () => {
  popUp.style.display = "block";
});
//* -----------------------------------------------------------------------------
// *                     表單 監聽 功能
//* -------------------------------------------------------------------------
infoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (foodDisc.value === "carn") {
    carnivore();
  }
  if (modeSelect.value === "cat") {
    var newButton = document.createElement("button");
    newButton.innerHTML = "貓貓";
    newButton.id = "catButton";
    clickArea.replaceChild(newButton, gButton);
    catButton = newButton;
    catButton.addEventListener("click", catMode);
  }
  popUp.style.display = "none";
});
modeSelect.addEventListener("change", (e) => {
  if (modeSelect.value === "person") {
    modeDisp.style.display = "block";
  }
});
//* -----------------------------------------------------------------------------
// *                     表單 監聽 功能結束
//* -------------------------------------------------------------------------
//* -----------------------------------------------------------------------------
// *                     按鈕 監聽 功能
//* -------------------------------------------------------------------------

gButton.addEventListener("click", generate);
// gButton.addEventListener("click", shopShow);

triButton.addEventListener("click", triple);
quintButton.addEventListener("click", quintuple);
gatlButton.addEventListener("click", () => {
  gatlButton.disabled = true;
  Gatling();
  galtNumDisp.innerHTML = ++galtlAmt;
});

//* -----------------------------------------------------------------------------
// *                     按鈕 監聽 功能結束
//* -------------------------------------------------------------------------
//* -----------------------------------------------------------------------------
// *                     merit 監聽 功能
//* -------------------------------------------------------------------------

var observer = new MutationObserver(function (meritsChange) {
  meritsChange.forEach(function (meritChange) {
    if (meritChange.type === "childList" || meritChange.type === "subtree") {
      if (Number(meritAmt.innerHTML) >= 10) {
        shopShow();
      }
      if (Number(meritAmt.innerHTML) >= 100 && !isTriple) {
        triButton.disabled = false;
      }
      if (Number(meritAmt.innerHTML) >= 500 && !isQuintuple) {
        quintButton.disabled = false;
      }
      if (Number(meritAmt.innerHTML) >= 1000 * galtCost) {
        gatlButton.disabled = false;
      }
    }
  });
});
observer.observe(meritAmt, { childList: true, subtree: true });

//* -----------------------------------------------------------------------------
// *                     merit 監聽 功能結束
//* -------------------------------------------------------------------------
//* -----------------------------------------------------------------------------
// *                     merit 按鈕變化
//* -------------------------------------------------------------------------
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
}
function carnivore() {
  var timeId = window.setInterval(
    () => --meritAmt.innerHTML,

    1000
  );
  meritPerSec -= 1;
  autoMerit.innerHTML = meritPerSec;
  return timeId;
}
function catMode() {
  let isAdd = Math.random() > 0.5;
  if (isAdd) {
    if (isQuintuple) {
      meritAmt.innerHTML = Number(meritAmt.innerHTML) + 5;
      playFallAudio();
    } else if (isTriple) {
      meritAmt.innerHTML = Number(meritAmt.innerHTML) + 3;

      playFallAudio();
    } else {
      meritAmt.innerHTML = Number(meritAmt.innerHTML) + 3;

      playFallAudio();
    }
  } else {
    if (isQuintuple) {
      meritAmt.innerHTML = Number(meritAmt.innerHTML) - 3;
      playFallAudio();
    } else if (isTriple) {
      meritAmt.innerHTML = Number(meritAmt.innerHTML) - 1;

      playFallAudio();
    } else {
      meritAmt.innerHTML = Number(meritAmt.innerHTML) - 2;

      playFallAudio();
    }
  }
}
//* -----------------------------------------------------------------------------
// *                     merit 按鈕變化 功能結束
//* -------------------------------------------------------------------------
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
    () => (meritAmt.innerHTML = Number(meritAmt.innerHTML) + 120 * galtlAmt),
    1000
  );
  meritPerSec += 120;
  autoMerit.innerHTML = meritPerSec;
  galtCostValue.innerHTML = ++galtCost * 1000;

  return timeId;
}
//* -----------------------------------------------------------------------------
// *                     shop 功能結束
//* -------------------------------------------------------------------------
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
