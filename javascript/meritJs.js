var clickCount = 0;
var isTriple = false;
var isQuintuple = false;

gButton.addEventListener("click", generate);
gButton.addEventListener("click", shopShow);
triButton.addEventListener("click", triple);

quintButton.addEventListener("click", quintuple);



function generate() {
  
   if (isQuintuple) {
     clickCount += 5;
     playFallAudio();
   } else if (isTriple) {
     clickCount += 3;

     playFallAudio();
   } else {
     clickCount++;
     playFallAudio();
   }
  meritAmt.innerHTML = clickCount;
  // if(meritAmt.innerHTML>=10){
  //     shopShow();
  // }
  if (meritAmt.innerHTML >= 100&&!isTriple) {
    triButton.disabled = false;
    }
    if (meritAmt.innerHTML>=500&&!isQuintuple) {
        quintButton.disabled = false;
    }
}
//addeventlistener

function triple() {
  isTriple = true;
  triButton.disabled = true;
}
function quintuple() {
    isQuintuple = true;
    quintButton.disabled = true;
}
// ! 要再修改
// TODO 再修改
function shopShow() {
  if (clickCount > 9) {
    shop.classList.remove("hidden");
    shop.classList.add("visible");
  }
}

function playFallAudio() {
  const audio = document.createElement("audio");
  audio.src = "../sounds/fall.mp3";
  audio.play();
}
