var clickCount = 0;
var istrible = false;
var gButton = document.getElementById("gButton");
console.log(gButton);
gButton.addEventListener("click",generate);
gButton.addEventListener("click",shopShow);



function generate() {
    if(istrible){
        clickCount+=3;
        
        playFallAudio();

    }else {
        clickCount++;
        playFallAudio();

    }
    document.getElementById("meritAmt").innerHTML = clickCount;
    // if(document.getElementById("meritAmt").innerHTML>=10){
    //     shopShow();
    // }
    if(document.getElementById("meritAmt").innerHTML>=100){
        document.getElementById("tributton").disabled = false;
    }
}
//addeventlistener




function triblize() {
    istrible = true;
    document.getElementById("tributton").disabled =true;
}
function shopShow(){
    var shopD=document.getElementById("shop");
    if (clickCount>9) {
        shopD.classList.remove('hidden');
        shopD.classList.add('visible');
        
    }
}

function playFallAudio() {
    const audio = document.createElement("audio");
    audio.src="../sounds/fall.mp3";
    audio.play();
}