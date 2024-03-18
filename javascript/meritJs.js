var isTriple = false;
var isQuintuple = false;
var isGatling = false;
var isMeritForever = false;
var galtlAmt = 1;
var galtCost = 1;
var galtNum = 0;
var meritPerSec = 0;
var catButton;
var meritForAmt = 1;
var meritForCost = 1;
var meritForNum = 0;

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
gButton.addEventListener("click", () => {
  let isRight = Math.random() < 0.5;
  if (isRight) {
    fallRight();
  } else {
    fallLeft();

  }
  
});
triButton.addEventListener("click", triple);
quintButton.addEventListener("click", quintuple);
gatlButton.addEventListener("click", () => {
  gatlButton.disabled = true;
  Gatling();
  galtNumDisp.innerHTML = ++galtlAmt;
});
forButton.addEventListener("click", () => {
  forButton.disabled = true;
  console.log(forButton.disabled);
  meritForever();
  meritNumDisp.innerHTML = ++meritForAmt;
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
      if (Number(meritAmt.innerHTML) >= 100000 * meritForCost) {
        forButton.disabled = false;
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
  } else if (isTriple) {
    meritAmt.innerHTML = Number(meritAmt.innerHTML) + 3;
  } else {
    meritAmt.innerHTML++;
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
    } else if (isTriple) {
      meritAmt.innerHTML = Number(meritAmt.innerHTML) + 3;
    } else {
      meritAmt.innerHTML = Number(meritAmt.innerHTML) + 3;
    }
  } else {
    if (isQuintuple) {
      meritAmt.innerHTML = Number(meritAmt.innerHTML) - 3;
    } else if (isTriple) {
      meritAmt.innerHTML = Number(meritAmt.innerHTML) - 1;
    } else {
      meritAmt.innerHTML = Number(meritAmt.innerHTML) - 2;
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
function meritForever() {
  isMeritForever = true;
  meritAmt.innerHTML = Number(meritAmt.innerHTML) - 100000 * meritForCost;

  var timeId = window.setInterval(
    () => (meritAmt.innerHTML = Number(meritAmt.innerHTML) + 200 * meritForAmt),
    1000
  );
  meritPerSec += 200;
  autoMerit.innerHTML = meritPerSec;
  meritCosVal.innerHTML = ++meritForCost * 100000;

  return timeId;
}
//* -----------------------------------------------------------------------------
// *                     shop 功能結束
//* -------------------------------------------------------------------------
//* -----------------------------------------------------------------------------
// *                     動畫 控制
//* -------------------------------------------------------------------------
// function animate({ timing, draw, duration }) {
//   let startTime = performance.now();
//   requestAnimationFrame((time) => {
//     let timeFraction = (time - startTime) / duration;
//     if (timeFraction > 1) {
//       timeFraction = 1;
//     }
//     let progress = timing(timeFraction);
//     draw(progress);
//     if (timeFraction < 1) {
//       requestAnimationFrame(animate);
//     }
//   })
// }
function animate({ timing, draw, duration }) {
  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction 从 0 增加到 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // 计算当前动画状态
    let progress = timing(timeFraction);

    draw(progress); // 绘制

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}
//* 接受时序函数，返回变换后的变体
function makeEaseOut(timing) {
  return function (timeFraction) {
    return 1 - timing(1 - timeFraction);
  };
}
// *自由落體公式
function freeFallTiming(timeFraction) {
  let acceleration = 9.8;
  let initialVelocity = 0;
  let progress = 0.5 * acceleration * Math.pow(timeFraction, 2);
  return progress;
}
function quad(timeFraction) {
  return Math.pow(timeFraction, 2);
}

function fallRight() {
  let fish = document.createElement("img");
  fish.src = "../images/heads-downward.svg";
  fish.className = "fish";
  fish.style.height = "100px";
  fish.style.width = "100px";
  fish.style.position = "absolute";
  fish.style.top = animateField.clientHeight - 100 + "px";
  // console.log(fish);
  animateField.appendChild(fish);

  let xStart = Math.floor(Math.random() * 700) + 1;

  let isPlayed = false;

  animate({
    duration: 2000,
    timing: freeFallTiming,
    draw: function (progress) {
      fish.style.top = progress * animateField.clientHeight - 50 + "px";
      if (
        parseFloat(fish.style.top) + 200 > animateField.clientHeight &&
        !isPlayed
      ) {
        isPlayed = true;
        playFallAudio();
      }
    },
  });
  animate({
    duration: 2000,
    timing: makeEaseOut(quad),
    draw: function (progress) {
      fish.style.left =
        (progress * animateField.clientWidth) / 2 + xStart + "px";
    },
  });
  setTimeout(() => {
    animateField.removeChild(fish);
  }, 2000);
}
function fallLeft() {
  let fish = document.createElement("img");
  fish.src = "../images/a-fish-.svg";
  fish.className = "fish";
  fish.style.height = "100px";
  fish.style.width = "100px";
  fish.style.position = "absolute";
  fish.style.top = animateField.clientHeight - 100 + "px";
  // console.log(fish);
  animateField.appendChild(fish);
  let rightBorder = animateField.clientWidth;
  console.log(animateField.clientWidth);

  let xStart =
    Math.floor(Math.random() * (rightBorder / 2 + 1)) + (rightBorder / 2);
  console.log(xStart);

  let isPlayed = false;

  animate({
    duration: 2000,
    timing: freeFallTiming,
    draw: function (progress) {
      fish.style.top = progress * animateField.clientHeight - 50 + "px";
      if (
        parseFloat(fish.style.top) + 200 > animateField.clientHeight &&
        !isPlayed
      ) {
        isPlayed = true;
        playFallAudio();
      }
    },
  });
  animate({
    duration: 2000,
    timing: makeEaseOut(quad),
    draw: function (progress) {
      fish.style.left = 

        xStart-(progress * animateField.clientWidth/2) + "px";
    },
  });
  setTimeout(() => {
    animateField.removeChild(fish);
  }, 2000);
}

//* -----------------------------------------------------------------------------
// *                     動畫 控制結束
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
