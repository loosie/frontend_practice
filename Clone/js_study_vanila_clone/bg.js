const body = document.querySelector("body");

const IMG_NUMBER = 3;

//  API에서만 작동 loadend 
// function handleImgLoad(){
//     console.log("finished loading");
// }

function paintImage(imgNumber){
    const image = new Image();
    image.src = `images/image${imgNumber+1}.png`

    image.classList.add("bgImage");
    body.appendChild(image);
    // image.addEventListener("loadend", handleImgLoad);
}

function genRandom(){
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();