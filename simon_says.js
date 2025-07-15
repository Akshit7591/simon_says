let gameseq=[];
let userseq=[];
let high_score = 0;

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

let btns = ["red", "yellow", "green", "purple"];

document.addEventListener("keypress", function (){
    if(started==false){
        console.log("game has started");
        started = true;

        levelUp();
    }
});

function gameflash(btn){
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
    
}
function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp(){
    userseq=[];
    level++
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameseq.push(randColor);
    gameflash(randBtn);
}

function checkans(idx){
    if(userseq[idx]===gameseq[idx]){
        if(userseq.length==gameseq.length){
            setTimeout(levelUp, 1000);
        }
    }else{
        if(level-1>high_score){
            high_score=level-1;
        }
        h2.innerHTML=`Game Over. Press any key to start. <br> your last score was <b>${level-1}</b><br>High Score: ${high_score}`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}
function btnpress(){
    let btn = this;
    userflash(btn);
    usercolor = btn.getAttribute("id");
    userseq.push(usercolor);

    checkans(userseq.length-1);

}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnpress);
}

function reset(){
    started = false;
    gameseq=[];
    userseq=[];
    level = 0;
}
